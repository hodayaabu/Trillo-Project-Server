import { userService } from "./user.service.js";
import { logger } from "../../services/logger.service.js";
import { utilService } from "../../services/util.service.js";

export async function getUsers(req, res) {
  try {
    // const filterBy = {
    //   txt: req.query.txt || "",
    //   minBalance: +req.query.minBalance || 0,
    // }
    const users = await userService.query();
    res.send(users);
  } catch (err) {
    logger.error("Failed to get users - ", err);
    res.status(400).send({ err: "Failed to get users" });
  }
}

export async function getUser(req, res) {
  const userId = req.params.id;
  try {
    const user = await userService.getById(userId);
    res.send(user);
  } catch (err) {
    logger.error("Failed to get user - " + err);
    res.status(400).send({ err: "Failed to get user" });
  }
}

export async function removeUser(req, res) {
  const userId = req.params.id;
  try {
    const deletedCount = await userService.remove(userId);
    res.json({ message: `User Deleted: ${userId}`, deletedCount });
  } catch (err) {
    logger.error("Couldn't remove user - " + err);
    res.status(400).send("Could't remove User");
  }
}

export async function addUser(req, res) {
  const { username, fullname, password, email, imgUrl } = req.body;
  const userToSave = {
    username,
    fullname,
    password,
    email,
    imgUrl,
  };
  try {
    const savedUser = await userService.add(userToSave);
    res.send(savedUser);
  } catch (err) {
    logger.error("Couldn't add user - " + err);
    res.status(400).send({ err: "Could't add user" });
  }
}
