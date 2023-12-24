// http-server.mjs
import http from 'node:http';
import { logger } from './utils/index.mjs';

export function startHttpServer() {
  const PORT = process.env.PORT || 3000

  const server = http.createServer((req, res) => {
    res.writeHead(200);
    res.end('Hello World\n');
  });

  server.listen(Number(PORT), () => {
    logger.log('API', `Worker ${process.pid} - HTTP server listening on port ${PORT}`);
  });
}
