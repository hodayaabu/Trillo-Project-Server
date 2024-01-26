import { boardService } from "./board.service.js";

// lIST
export async function getBoards(req, res) {
  try {
    let filterBy = {};
    const boards = await boardService.query(filterBy);
    res.send(boards);
  } catch (err) {
    // logger.error("Couldn't get boards - " + err);
    res.status(400).send({ err: "Failed to get boards" });
  }
}

// GetByID
export async function getBoard(req, res) {
  const { boardId } = req.params;
  try {
    const board = await boardService.getById(boardId);
    res.send(board);
  } catch (err) {
    // logger.error("Couldn't get board - " + err);
    res.status(400).send({ err: "Couldn't get board" });
  }
}

// POST-----POST-----POST-----POST-----POST-----POST-----POST-----POST-----POST-----POST-----POST-----POST
export async function addBoard(req, res) {
  const { title, style } = req.body;
  const boardToSave = {
    title,
    style,
  };
  try {
    const savedBoard = await boardService.add(boardToSave, req.loggedinUser);
    res.send(savedBoard);
  } catch (err) {
    // logger.error("Couldn't add board - " + err);
    res.status(400).send({ err: "Could't add board" });
  }
}

// UPDATE-----UPDATE-----UPDATE-----UPDATE-----UPDATE-----UPDATE-----UPDATE-----UPDATE-----UPDATE-----UPDATE-----UPDATE-----UPDATE
export async function updateBoard(req, res) {
  const { boardId } = req.params;
  const { _id, ...boardWithoutId } = req.body;
  const boardToUpdate = {
    _id: boardId,
    ...boardWithoutId,
  };

  try {
    const updatedBoard = await boardService.update(
      boardToUpdate,
      req.loggedinUser
    );
    res.send(updatedBoard);
  } catch (err) {
    // logger.error("Couldn't update board - " + err);
    res.status(400).send("Could't update board" + err);
  }
}

// DELETE-----DELETE-----DELETE-----DELETE-----DELETE-----DELETE-----DELETE-----DELETE-----DELETE-----DELETE-----DELETE-----DELETE
export async function removeBoard(req, res) {
  const { boardId } = req.params;
  try {
    const deletedCount = await boardService.remove(boardId, req.loggedinUser);
    res.json({ message: `Board Deleted: ${boardId}`, deletedCount });
  } catch (err) {
    // logger.error("Couldn't remove board - " + err);
    res.status(400).send("Could't remove board");
  }
}
