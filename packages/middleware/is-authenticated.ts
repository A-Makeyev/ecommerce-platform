import { NextFunction, Response } from 'express'
import prisma from '@packages/libs/prisma'
import jwt from 'jsonwebtoken'


const isAuthenticated = async (req: any, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.access_token || req.headers.authorization?.split(' ')[1]

        
        if (!token) {
            return res.status(401).json({ message: 'Token not found' })
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN!) as { id: string, role: 'user' | 'seller' }

        if (!decodedToken) {
            return res.status(401).json({ message: 'Token not verified' })
        }

        const account = await prisma.users.findUnique({ where: { id: decodedToken.id } })

        req.user = account

        if (!account) {
            return res.status(401).json({ message: 'User not found' })
        }

        return next()
    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized. Token invalid or expired' })
    }
}

export default isAuthenticated