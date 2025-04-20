import express from "express";
import * as memC from '../controller/loginController.js'

const router = express.Router()
router.post('/member/login', memC.Login)
// router.get('/member/test', memC.test)

export default router