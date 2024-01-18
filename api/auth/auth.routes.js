import express from 'express'
import { authController } from './auth.controller.js'

const router = express.Router()

router.post('/login', authController.login)
router.post('/logout', authController.logout)
router.post('/signup', authController.signup)

export const authRoutes = router
