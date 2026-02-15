import prisma from "@packages/libs/prisma"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { AuthError, ValidationError } from "@packages/error-handler"
import { NextFunction, Request, Response } from "express"
import { checkOtpRestrictions, sendOtp, trackOtpRequest, validateRegistrationData, verifyOtp } from "../utils/auth.helper"
import { setCookie } from "../utils/cookies/setCookie"


export const userRegistration = async (req: Request, res: Response, next: NextFunction) => {
    try {
        validateRegistrationData(req.body, 'user')

        const { name, email, password } = req.body
        const existingUser = await prisma.users.findUnique({ where: { email } })

        if (existingUser) {
            return next(new ValidationError('User already exists'))
        }

        await checkOtpRestrictions(email)
        await trackOtpRequest(email)
        await sendOtp(name, email, 'user-activation-email')

        res.status(200).json({
            message: `OTP sent to ${email} for account activation`
        })
    } catch (err) {
        return next(err)
    }
}

export const userVerification = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, otp, password, name } = req.body

        if (!email || !otp || !password || !name) {
            return next(new ValidationError('Missing required fields'))
        }

        const existingUser = await prisma.users.findUnique({ where: { email } })

        if (existingUser) {
            return next(new ValidationError('User already exists'))
        }

        await verifyOtp(email, otp)

        const hashedPassword = await bcrypt.hash(password, 10)

        await prisma.users.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        })

        res.status(201).json({
            message: 'Accout created successfully',
            success: true
        })
    } catch (err) {
        return next(err)
    }
}

export const userLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return next(new ValidationError('Email and password are required'))
        }

        const user = await prisma.users.findUnique({ where: { email } })

        if (!user) {
            return next(new AuthError('Invalid email or password'))
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password!)

        if (!isPasswordMatch) {
            return next(new AuthError('Invalid email or password'))
        }

        const accessToken = jwt.sign({
            id: user.id,
            role: "user",
        }, process.env.ACCESS_TOKEN as string, { expiresIn: '15m' })

        const refreshToken = jwt.sign({
            id: user.id,
            role: "user",
        }, process.env.REFRESH_TOKEN as string, { expiresIn: '7d' })

        setCookie(res, 'access_token', accessToken)
        setCookie(res, 'refresh_token', refreshToken)

        res.status(200).json({
            message: 'Login successful',
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        })
    } catch (err) {
        return next(err)
    }
}