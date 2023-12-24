import cluster, { isMaster } from 'node:cluster';
import { startHttpServer } from './src/http-server.mjs';
import { startSocketIOServer, stopSocketIOServer } from './src/socket-io-server.mjs';
import { logger } from './src/utils/index.mjs';
import { generateRandomError } from './src/utils/generateRandomError.mjs';


let io;
const numCPUs = process.env.CPUS || require('os').cpus().length / 2;

if (isMaster) {
  logger.log('API', `Master ${process.pid} is running`);

  const startNewWorker = () => {
    const newWorker = cluster.fork();
    logger.warn('API', `New Worker ${newWorker.process.pid} is running`);
  };

  io = startSocketIOServer();

  for (let i = 0; i < numCPUs; i++) {
    startNewWorker();
  }

  cluster.on('exit', (worker, code, signal) => {
    logger.err('API', `Worker ${worker.process.pid} died with code ${code} and signal ${signal}`);
    startNewWorker();
  });

  process.on('SIGTERM', () => {
    stopSocketIOServer();

    for (const id in cluster.workers) {
      cluster.workers[id].kill('SIGTERM');
    }
    process.exit(0);
  });
} else {
  startHttpServer();
  setInterval(() => generateRandomError(), 5000)
}
