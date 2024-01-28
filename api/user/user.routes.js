import express from "express";
// import { userController } from "./user.controller.js";
import { requireAuth } from "../../middlewares/requireAuth.middleware.js";

import { getUsers, getUser, updateUser, addUser, removeUser } from "./user.controller.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", requireAuth, getUser);
router.put("/:id", requireAuth, updateUser);
router.post("/", addUser);
router.delete("/:id", removeUser);

export const userRoutes = router;
