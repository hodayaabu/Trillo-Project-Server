import express from "express";
import {
  addBoard,
  getBoard,
  getBoards,
  removeBoard,
  updateBoard,
} from "./board.controller.js";

const router = express.Router();

router.get("/", getBoards);
router.get("/:boardId", getBoard);
router.delete("/:boardId", removeBoard);
router.post("/", addBoard);
router.put("/:boardId", updateBoard);

export const boardRoutes = router;
