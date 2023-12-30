import { boardService } from "./board.service.js"

export const boardController = {
  getBoards,   // LIST
  getBoard,    // GetByID
  addBoard,    // POST
  updateBoard, // UPDATE
  removeBoard  // DELETE
}

// lIST
async function getBoards(req, res) {
  try {
    let filterBy = {}
    const boards = await boardService.query(filterBy)
    res.send(boards)
  } catch (err) {
    logger.error("Couldn't get boards - " + err)
    res.status(400).send({ err: "Failed to get boards" })
  }
}

// GetByID
async function getBoard(req, res) {
  const { boardId } = req.params
  try {
    const board = await boardService.getById(boardId)
    res.send(board)
  } catch (err) {
    logger.error("Couldn't get board - " + err)
    res.status(400).send({ err: "Couldn't get board" })
  }
}

// POST
async function addBoard(req, res) {
  const boardToSave = { ...req.body }
  try {
    const savedBoard = await boardService.add(boardToSave, req.loggedinUser)
    res.send(savedBoard)
  } catch (err) {
    logger.error("Couldn't add board - " + err)
    res.status(400).send({ err: "Could't add board" })
  }
}

// UPDATE
async function updateBoard(req, res) {
  const { boardId } = req.params
  const boardToUpdate = {
    _id: boardId,
    ...req.body,
  }
  try {
    const updatedBoard = await boardService.update(
      boardToUpdate,
      req.loggedinUser
    )
    res.send(updatedBoard)
  } catch (err) {
    logger.error("Couldn't update board - " + err)
    res.status(400).send({ err: "Could't update board" })
  }
}

// DELETE
async function removeBoard(req, res) {
  const { boardId } = req.params
  try {
    const deletedCount = await boardService.remove(boardId, req.loggedinUser)
    res.json({ message: `Board Deleted: ${boardId}`, deletedCount })
  } catch (err) {
    logger.error("Couldn't remove board - " + err)
    res.status(400).send("Could't remove board")
  }
}
