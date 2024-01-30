import { Server } from 'socket.io'
import { logger } from './logger.service.js'


export const socketService = {
    setupSocketAPI,     // set up the sockets service and define the API
    emitTo,             // emit to everyone / everyone in a specific label
    emitToUser,         // emit to a specific user (if currently active in system)
    broadcast,          // Send to all sockets BUT not the current socket, if found
    broadcastForLabel,  // Send to all sockets BUT not the current socket, if found - For a specific label
    broadcastBoardWatchers,  // Send to all sockets who watch the board BUT not the current socket
}


let gIo = null

function setupSocketAPI(httpServer) {
    gIo = new Server(httpServer, {  // ASK - What is it?
        cors: {
            origin: '*',
        }
    })
    gIo.on('connection', socket => {
        logger.info(`New connected socket [id: ${socket.id}]`)
        socket.on('disconnect', socket => {
            logger.info(`Socket disconnected [id: ${socket.id}]`)
        })
        // userId
        socket.on('set-user-socket', userId => {
            logger.info(`Setting socket.userId = ${userId} for socket [id: ${socket.id}]`)
            socket.userId = userId
        })
        socket.on('unset-user-socket', () => {
            logger.info(`Removing socket.userId for socket [id: ${socket.id}]`)
            delete socket.userId
        })
        // boardId
        socket.on('set-board-socket', boardId => {
            logger.info(`Setting socket.boardId = ${boardId} for socket [id: ${socket.id}]`)
            socket.boardId = boardId
        })
        socket.on('unset-board-socket', () => {
            logger.info(`Removing socket.boardId for socket [id: ${socket.id}]`)
            delete socket.boardId
        })
    })
}



function emitTo({ msgType, data, label }) {
    if (label) gIo.to(label.toString()).emit(msgType, data)
    else gIo.emit(msgType, data)
}

async function emitToUser({ msgType, data, userId }) {
    try {
        const socket = await _getUserSocket(userId)
        if (socket) {
            logger.info(`Emiting event: ${msgType} to user: ${userId} socket [id: ${socket.id}]`)
            socket.emit(msgType, data)
        } else {
            logger.info(`No active socket for user: ${userId}`)
        }
    } catch (err) {
        logger.error('Failed in emitToUser:', err)
        throw err
    }
}

async function broadcast({ msgType, data, userId }) {
    logger.info(`Broadcasting event: ${msgType}`)
    const userSocket = await _getUserSocket(userId)
    if (userSocket) {
        logger.info(`Broadcast to all excluding user: ${userId}`)
        userSocket.broadcast.emit(msgType, data)
    } else {
        logger.info(`Emit to all`)
        gIo.emit(msgType, data)
    }
}

async function broadcastBoardWatchers({msgType, data, userId, boardId}) {
    const sockets = await gIo.fetchSockets()
    const wantedSockets = sockets.filter((soc) => soc?.userId !== userId && soc?.boardId === boardId)
    logger.info(`Broadcast to all who watch board ${boardId} excluding user`)
    for (let soc of wantedSockets) {
        logger.info(`Emit to ${soc}`)
        soc.emit(msgType, data)
    }
}

async function broadcastForLabel({ msgType, data, userId, label}) {
    logger.info(`Broadcasting event: ${msgType}`)
    if (!label) {
        return broadcast({ msgType, data, userId })
    }
    const userSocket = await _getUserSocket(userId)
    if (userSocket) {
        logger.info(`Broadcast to label ${label} excluding user: ${userId}`)
        userSocket.broadcast.to(label).emit(msgType, data)
    } else {
        logger.info(`Emit to label: ${label}`)
        gIo.to(label).emit(msgType, data)
    }
}

async function _getUserSocket(userId) {
    const sockets = await gIo.fetchSockets()
    const socket = sockets.find(s => s.userId === userId.toString())
    return socket
}
