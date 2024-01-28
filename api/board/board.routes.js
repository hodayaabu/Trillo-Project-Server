import express from "express"
import { getBoard, getBoards, removeBoard, addBoard, updateBoard, getUserBoards } from "./board.controller.js"
import { requireAuth } from '../../middlewares/requireAuth.middleware.js'

const router = express.Router()

// router.get("/", requireAuth, getBoards)
// router.get("/:boardId", requireAuth, getBoard)
// router.delete("/:boardId", requireAuth, removeBoard)
// router.post("/", requireAuth, addBoard)
// router.put("/:boardId", requireAuth, updateBoard)

router.get("/", requireAuth, getBoards)
router.get("/home/:userId", requireAuth, getUserBoards);
router.get("/:boardId", requireAuth, getBoard)
router.delete("/:boardId", requireAuth, removeBoard)
router.post("/", requireAuth, addBoard)
router.put("/:boardId", requireAuth, updateBoard)

export const boardRoutes = router
