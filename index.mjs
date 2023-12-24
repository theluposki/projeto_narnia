import cluster, { isMaster } from "node:cluster";
import http from "node:http";
import { cpus } from "node:os";
import { logger } from "./src/utils/index.mjs";

const numCPUs = process.env.CPUS || cpus().length / 2;

if (isMaster) {
  logger.log("API", `Master ${process.pid} is running`);
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    logger.log("API",`Worker ${worker.process.pid} died`);
  });
} else {
  // Workers can share any TCP connection
  // In this case, an HTTP server
  const server = http.createServer((req, res) => {
    res.writeHead(200);
    res.end('Hello World\n');
  });

  server.listen(3000, () => {
    logger.log("API",`Worker ${process.pid} started`);
  });
}
