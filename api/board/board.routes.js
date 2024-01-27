import express from "express"
import { getBoard, getBoards, removeBoard, addBoard, updateBoard, getUserBoards } from "./board.controller.js"
import { requireAuth } from '../../middlewares/requireAuth.middleware.js'

const router = express.Router()

// router.get("/", requireAuth,getBoards)
// router.get("/:boardId", requireAuth, boardController.getBoard)
// router.delete("/:boardId", requireAuth, boardController.removeBoard)
// router.post("/", requireAuth, boardController.addBoard)
// router.put("/:boardId", requireAuth, boardController.updateBoard)

router.get("/", getBoards)
router.get("/home/:userId", getUserBoards);
router.get("/:boardId", getBoard)
router.delete("/:boardId", removeBoard)
router.post("/", addBoard)
router.put("/:boardId", updateBoard)

export const boardRoutes = router
