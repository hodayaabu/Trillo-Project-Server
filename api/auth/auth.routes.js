import express from 'express'
import { login, logout, signup } from './auth.controller.js'

const router = express.Router()

router.post('/login', login)
router.post('/logout', logout)
router.post('/signup', signup)

export const authRoutes = router
