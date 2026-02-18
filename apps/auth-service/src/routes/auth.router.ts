import express, { Router } from "express"
import { 
    forgotPassword, 
    refreshToken, 
    resetPassword, 
    userLogin, 
    userRegistration, 
    userVerification, 
    verifyUserForgotPassword 
} from "../controller/auth.controller"


const router: Router = express.Router()

router.post('/user-registration', userRegistration)
router.post('/user-verification', userVerification)
router.post('/user-login', userLogin)
router.post('/refresh-token', refreshToken)
router.post('/forgot-password', forgotPassword)
router.post('/verify-forgot-password', verifyUserForgotPassword)
router.post('/reset-password', resetPassword)

export default router