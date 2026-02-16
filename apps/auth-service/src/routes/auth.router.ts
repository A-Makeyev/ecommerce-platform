import express, { Router } from "express"
import { forgotPassword, resetPassword, userLogin, userRegistration, userVerification, verifyUserForgotPassword } from "../controller/auth.controller"


const router: Router = express.Router()

router.post('/user-registration', userRegistration)
router.post('/user-verification', userVerification)
router.post('/user-login', userLogin)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password', resetPassword)
router.post('/verify-forgot-password', verifyUserForgotPassword)

export default router