import express from 'express'
import { userController } from './user.controller.js'
import { requireAdmin } from '../../middlewares/requireAuth.middleware.js'

const router = express.Router()

router.get('/', requireAdmin, userController.getUsers)
router.get('/:id', requireAdmin, userController.getUser)
router.put('/:id', requireAdmin, userController.updateUser)
router.delete('/:id', requireAdmin, userController.deleteUser)

export const userRoutes = router