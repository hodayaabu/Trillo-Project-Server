import express from "express";
// import { userController } from "./user.controller.js";
import { requireAdmin } from "../../middlewares/requireAuth.middleware.js";

import {
  getUsers,
  getUser,
  updateUser,
  addUser,
  removeUser,
} from "./user.controller.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", requireAdmin, getUser);
router.put("/:id", requireAdmin, updateUser);
router.post("/", requireAdmin, addUser);
router.delete("/:id", requireAdmin, removeUser);

export const userRoutes = router;
