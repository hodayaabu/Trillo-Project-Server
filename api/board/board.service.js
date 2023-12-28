import { logger } from "../../services/logger.service.js";
import { utilService } from "../../services/util.service.js";
import { dbService } from "../../services/db.service.js";
import { ObjectId } from "mongodb";

export const boardService = {
  query,
  getById,
  remove,
  add,
  update,
};

const collectionName = "boards";

// lIST-----LIST-----lIST-----LIST-----lIST-----LIST-----lIST-----LIST-----lIST-----LIST-----lIST-----LIST-----lIST-----LIST-----LIST
async function query(filterBy = {}) {
  try {
    //   const criteria = _buildCriteria(filterBy);
    //   const bugCursor = await collection.find(criteria);
    const collection = await dbService.getCollection(collectionName);
    const boards = await collection.find().toArray();

    return boards;
  } catch (err) {
    logger.error("boardService[list] : ", err);
    throw err;
  }
}

// GetByID-----GetByID-----GetByID-----GetByID-----GetByID-----GetByID-----GetByID-----GetByID-----GetByID-----GetByID-----GetByID-----GetByID
async function getById(boardId) {
  try {
    const collection = await dbService.getCollection(collectionName);
    const board = collection.findOne({ _id: new ObjectId(boardId) });

    if (!board) throw `Couldnt find a board with id: ${bugId}`;
    return board;
  } catch (err) {
    logger.error("boardService[getByID] : ", err);
    throw err;
  }
}

// POST-----POST-----POST-----POST-----POST-----POST-----POST-----POST-----POST-----POST-----POST-----POST
async function add(boardToAdd, loggedinUser) {
  try {
    const collection = await dbService.getCollection(collectionName);
    await collection.insertOne(boardToAdd);
    return boardToAdd;
  } catch (er) {
    loggerService.error("boardService[add] : ", err);
    throw err;
  }
}

// UPDATE-----UPDATE-----UPDATE-----UPDATE-----UPDATE-----UPDATE-----UPDATE-----UPDATE-----UPDATE-----UPDATE-----UPDATE-----UPDATE
async function update(board, loggedinUser) {
  try {
    const collection = await dbService.getCollection(collectionName);
    const fieldsToUpdate = { isStarred: board.isStarred };

    await collection.updateOne(
      { _id: new ObjectId(board._id) },
      { $set: fieldsToUpdate }
    );
    return "Updated successfully";
  } catch (err) {
    loggerService.error("boardService[update] : ", err);
    throw err;
  }
}

// DELETE-----DELETE-----DELETE-----DELETE-----DELETE-----DELETE-----DELETE-----DELETE-----DELETE-----DELETE-----DELETE-----DELETE
async function remove(boardId, loggedinUser) {
  try {
    const collection = await dbService.getCollection(collectionName);
    const { deletedCount } = await collection.deleteOne({
      _id: new ObjectId(boardId),
    });
    return deletedCount;
  } catch (err) {
    loggerService.error("boardService[Remove] : ", err);
    throw err;
  }
}
