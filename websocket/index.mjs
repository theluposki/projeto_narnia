import { Server } from "socket.io";
import { createServer } from "node:http";
import { logger } from "../src/utils/index.mjs";
const PORT = process.env.PORT_SOCKET || 3001

const server = createServer();

const io = new Server(server);

io.on('connection', (socket) => {
  console.log('Usuário conectado');

  // Lidar com evento personalizado
  socket.on('chat message', (msg) => {
    console.log('Mensagem: ' + msg);
    io.emit('chat message', msg);
  });

  // Lidar com desconexão
  socket.on('disconnect', () => {
    console.log('Usuário desconectado');
  });
});

server.listen(Number(PORT), () => {
  logger.log('SOCKET', `process: ${process.pid} - WS server listening on port ${PORT}`);
});