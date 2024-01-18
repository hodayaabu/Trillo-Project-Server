import express from "express"
import { boardController } from "./board.controller.js"
import { requireAuth } from '../../middlewares/requireAuth.middleware.js'

const router = express.Router()

// router.get("/", requireAuth, boardController.getBoards)
// router.get("/:boardId", requireAuth, boardController.getBoard)
// router.delete("/:boardId", requireAuth, boardController.removeBoard)
// router.post("/", requireAuth, boardController.addBoard)
// router.put("/:boardId", requireAuth, boardController.updateBoard)

router.get("/", boardController.getBoards)
router.get("/:boardId", boardController.getBoard)
router.delete("/:boardId", boardController.removeBoard)
router.post("/", boardController.addBoard)
router.put("/:boardId", boardController.updateBoard)

export const boardRoutes = router
