import { boardService } from "./board.service.js";

// lIST-----LIST-----lIST-----LIST-----lIST-----LIST-----lIST-----LIST-----lIST-----LIST-----lIST-----LIST-----lIST-----LIST-----LIST
export async function getBoards(req, res) {
  try {
    let filterBy = {};
    const boards = await boardService.query(filterBy);
    res.send(boards);
  } catch (err) {
    res.status(400).send("Failed to get boards");
  }
}

// GetByID-----GetByID-----GetByID-----GetByID-----GetByID-----GetByID-----GetByID-----GetByID-----GetByID-----GetByID-----GetByID-----GetByID
export async function getBoard(req, res) {
  const { boardId } = req.params;
  try {
    const board = await boardService.getById(boardId);
    res.send(board);
  } catch (err) {
    res.status(400).send("Couldn't get board" + err);
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
    res.status(400).send("Could't add board" + err);
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
    res.status(400).send("Could't update board" + err);
  }
}
// const { bugId } = req.params;
//   const { severity, owner } = req.body;
//   const bugToSave = {
//     _id: bugId,
//     severity: +severity,
//     owner,
//   };

// DELETE-----DELETE-----DELETE-----DELETE-----DELETE-----DELETE-----DELETE-----DELETE-----DELETE-----DELETE-----DELETE-----DELETE
export async function removeBoard(req, res) {
  const { boardId } = req.params;
  try {
    const deletedCount = await boardService.remove(boardId, req.loggedinUser);
    res.json({ message: `Bug Deleted: ${boardId}  `, deletedCount });
  } catch (err) {
    res.status(400).send("Could't remove board " + err);
  }
}
