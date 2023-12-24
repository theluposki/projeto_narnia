// socket-io-server.mjs
import { Server } from 'socket.io';
import { logger } from './utils/index.mjs';

const PORT = process.env.PORT_SOCKET || 3001

export function startSocketIOServer() {
  const io = new Server();

  io.on('connection', (socket) => {
    logger.log('Socket', `Worker ${process.pid} - Socket connected: ${socket.id}`);
    socket.emit('message', 'Hello from socket.io server');

    // Add socket.io event handling logic here

    socket.on('disconnect', () => {
      logger.log('Socket', `Worker ${process.pid} - Socket disconnected: ${socket.id}`);
    });
  });

  const socketIOServer = io.listen(Number(PORT))

  socketIOServer.on('listening', () => {
    logger.log('Socket', `Master - Socket.IO server listening on port ${PORT}`);
  });
}
