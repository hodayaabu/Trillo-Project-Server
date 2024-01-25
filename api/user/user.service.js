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

// async function getByUsername(username) {
//   return users.find((user) => user.username === username);
// }

async function remove(userId) {
  try {
    const collection = await dbService.getCollection(collectionName);
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
    await collection.insertOne(userToAdd);
    return userToAdd;
  } catch (er) {
    logger.error("UserService[add] : " + err);
    throw err;
  }
}

// async function update(user) {
//   try {
//     const collection = await dbService.getCollection(collectionName);
//     const fieldsToUpdate = { score: user.score };

//     await collection.updateOne(
//       { _id: new ObjectId(user._id) },
//       { $set: fieldsToUpdate }
//     );

//   } catch (err) {
//     loggerService.error(err);
//     throw err;
//   }
// }

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
