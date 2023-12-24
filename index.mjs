// index.mjs
import cluster, { isMaster } from 'node:cluster';
import { startHttpServer } from './src/http-server.mjs';
import { startSocketIOServer } from './src/socket-io-server.mjs';
import { logger } from './src/utils/index.mjs';

const numCPUs = process.env.CPUS || require('os').cpus().length / 2;

if (isMaster) {
  logger.log('API', `Master ${process.pid} is running`);
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  // Start Socket.IO server only in the master process
  startSocketIOServer();
  cluster.on('exit', (worker, code, signal) => {
    logger.log('API', `Worker ${worker.process.pid} died`);
  });
} else {
  // Workers handle HTTP server
  startHttpServer();
}
