// socket-io-server.mjs
import { Server } from 'socket.io';
import { logger } from './utils/index.mjs';
import { spawn } from 'child_process';

let apiProcess;

export function startSocketIOServer() {
  const appDirectory = "./";

  process.chdir(appDirectory);

  const apiServerPath = "./websocket/index.mjs"

  apiProcess = spawn("node", [
    "--no-warnings",
    "--experimental-modules",
    apiServerPath,
  ], { stdio: "pipe" });

  apiProcess.stdout.on("data", (data) => {
    logger.log("SOCKET:stdout",` stdout: ${data}`);
  });
  apiProcess.stderr.on("data", (data) => {
    logger.err("SOCKET:stderr",` stderr: ${data}`);
  });
  apiProcess.on("close", (code) => {
    logger.log("SOCKET:stdout",`\n stdout: process exited with code ${code}`);
  });
}
