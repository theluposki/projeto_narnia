import { logger } from "./utils/index.mjs";
import { spawn } from "node:child_process";

let apiProcess;

export function startSocketIOServer() {
  const appDirectory = "./";

  process.chdir(appDirectory);

  const apiServerPath = "./websocket/index.mjs";

  const devOrProd = process.env.NODE_ENV === "development" ? "--watch" : "";

  apiProcess = spawn(
    "node",
    ["--no-warnings", devOrProd, "--experimental-modules", apiServerPath],
    { stdio: "pipe" }
  );

  apiProcess.stdout.on("data", (data) => {
    logger.log("SOCKET:stdout", `stdout: ${data}`);
  });
  apiProcess.stderr.on("data", (data) => {
    logger.err("SOCKET:stderr", `stderr: ${data}`);
  });
  apiProcess.on("close", (code) => {
    logger.log("SOCKET:stdout", `\n stdout: process exited with code ${code}`);
  });
  return apiProcess;
}

export function stopSocketIOServer() {
  if (apiProcess) {
    apiProcess.kill();
    logger.log("SOCKET", "Servidor Socket.IO encerrado.");
  }
}
