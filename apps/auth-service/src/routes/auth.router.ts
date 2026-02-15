import express, { Router } from "express"
import { userLogin, userRegistration, userVerification } from "../controller/auth.controller"


const router: Router = express.Router()

router.post('/user-registration', userRegistration)
router.post('/user-verification', userVerification)
router.post('/user-login', userLogin)

export default router