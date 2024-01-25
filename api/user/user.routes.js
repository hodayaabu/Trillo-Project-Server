import express from "express";
// import { userController } from "./user.controller.js";
import { requireAdmin } from "../../middlewares/requireAuth.middleware.js";

import { getUsers, getUser, addUser, removeUser } from "./user.controller.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUser);
// router.put("/:id", userController.updateUser);
router.post("/", addUser);
router.delete("/:id", removeUser);

export const userRoutes = router;
