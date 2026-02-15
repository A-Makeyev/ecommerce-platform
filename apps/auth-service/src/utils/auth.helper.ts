import crypto from "crypto"
import redis from "@packages/libs/redis"
import { ValidationError } from "@packages/error-handler"
import { sendEmail } from "./sendEmail"
import { NextFunction } from "express"


const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const validateRegistrationData = (data: any, userType: 'user' | 'seller') => {
    const { name, email, password, phone_number, country } = data

    if (!name || !email || !password || (userType === 'seller' && (!phone_number || !country))) {
        throw new ValidationError('Missing required fields')
    }

    if (!emailRegex.test(email)) {
        throw new ValidationError('Invalid email format')
    }
}

export const checkOtpRestrictions = async (email: string, next: NextFunction) => {
    if (await redis.get(`otp_lock:${email}`)) {
        return next(new ValidationError('Account locked due to multiple attempts, try again in 30 minutes'))
    }

    if (await redis.get(`otp_spam_lock:${email}`)) {
        return next(new ValidationError('Too many OTP requests, try again in 1 hour'))
    }

    if (await redis.get(`otp_cooldown:${email}`)) {
        return next(new ValidationError('Please wait 1 minute before requesting another OTP'))
    }
}

export const trackOtpRequest = async (email: string, next: NextFunction) => {
    const otpRequestKey = `otp_request_count:${email}`
    let otpRequests = parseInt(await redis.get(otpRequestKey) || '0')

    if (otpRequests >= 3) {
        await redis.set(`otp_spam_lock:${email}`, 'true', 'EX', 3600) // Lock for 1 hour
        return next(new ValidationError('Too many OTP requests, try again in 1 hour'))
    }

    await redis.set(otpRequestKey, otpRequests + 1, 'EX', 3600) // Track OTP requests for 1 hour
}

export const sendOtp = async (name: string, email: string, template: string) => {
    const otp = crypto.randomInt(1000, 9999).toString()

    await sendEmail(email, 'Verification Code', template, { name, otp })
    await redis.set(`otp:${email}`, otp, 'EX', 300) // OTP expires in 5 minutes
    await redis.set(`otp_cooldown:${email}`, 'true', 'EX', 60) // Cooldown of 1 minute before requesting another OTP
}