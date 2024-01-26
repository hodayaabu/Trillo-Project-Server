import fs from "fs";
import { utilService } from "../../services/util.service.js";
import { dbService } from "../../services/db.service.js";
import { logger } from "../../services/logger.service.js";
import { ObjectId } from "mongodb";

const collectionName = "users";

export const userService = {
  query,
  getById,
  remove,
  add,
  update,
  getByUsername
};

async function query() {
  try {
    const collection = await dbService.getCollection(collectionName);
    const userCursour = await collection.find();
    const users = userCursour.toArray();
    return users;
  } catch (err) {
    logger.error("userService[list] : " + err);
    throw err;
  }
}

async function getById(userId) {
  try {
    const collection = await dbService.getCollection(collectionName);

    const user = collection.findOne({ _id: new ObjectId(userId) });
    if (!user) throw `Couldnt find a bug with id: ${userId}`;

    return user;
  } catch (err) {
    logger.error("userService[getById] : " + err);
    throw err;
  }
}

async function getByUsername(username) {
  const collection = await dbService.getCollection(collectionName);
  const user = collection.findOne({ username });
  if (!user) throw `Couldnt find a user with id: ${username}`;
  return user;
}

async function remove(userId) {
  try {
    const collection = await dbService.getCollection(collectionName);

    const user = collection.findOne({ _id: new ObjectId(userId) });
    if (!user) throw `Couldnt find a user: ${username}`;

    const { deletedCount } = await collection.deleteOne({
      _id: new ObjectId(userId),
    });
    return deletedCount;
  } catch (err) {
    logger.error("userService[Remove] : " + err);
    throw err;
  }
}

async function add(userToAdd) {
  try {
    const collection = await dbService.getCollection(collectionName);

    const user = collection.findOne({ username: userToAdd.username });
    if (user) throw `user ${userToAdd.username} already exists`;

    await collection.insertOne(userToAdd);
    return userToAdd;
  } catch (er) {
    logger.error("UserService[add] : " + err);
    throw err;
  }
}

async function update(user) {
  try {
    // peek only updatable properties
    const userToSave = {
      _id: new ObjectId(user._id), // needed for the returnd obj
      username: user.username,
      fullname: user.fullname,
      email: user.email,
      imgUrl: user.imgUrl,
      mentions: user.mentions
    }

    const collection = await dbService.getCollection(collectionName)

    const user = collection.findOne({ _id: new ObjectId(user._id) });
    if (!user) throw `Couldnt find a bug with id: ${user._id}`;

    await collection.updateOne({ _id: userToSave._id }, { $set: userToSave })
    return userToSave
  } catch (err) {
    logger.error(`cannot update user ${user._id}`, err)
    throw err
  }
}

// function _saveUsersToFile() {
//   return new Promise((resolve, reject) => {
//     const usersStr = JSON.stringify(users, null, 2);
//     fs.writeFile("data/user.json", usersStr, (err) => {
//       if (err) {
//         return console.log(err);
//       }
//       resolve();
//     });
//   });
// }
