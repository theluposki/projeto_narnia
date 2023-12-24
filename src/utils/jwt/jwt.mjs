import { readFile, access } from "node:fs/promises";
import jwt from "jsonwebtoken";
import { generateKeyPEMFile } from "../crypto/index.mjs";
import { hoursToMilliseconds } from "../datatime/index.mjs";
import logger from "../logger.mjs";

async function readKeyFile(filePath) {
  try {
    return await readFile(filePath);
  } catch (error) {
    logger.err("jwt",`Erro ao ler o arquivo ${filePath}:`, error);
    throw error;
  }
}

try {
  await access("private.key");
} catch (error) {
  logger.warn("jwt", "Não existe chaves:");
  generateKeyPEMFile();
}

const privateKey = await readKeyFile("private.key");
const publicKey = await readKeyFile("public.key");

let expires;


try {
  const config = await import("../../config.mjs");
  expires = config.default?.app?.tokenExpiresIn
} catch (error) {
  logger.err("jwt","Erro ao importar config.js:", error);
  expires = 1;
}

export const sign = (userId) => {
  const tokenPayload = {
    id: userId,
    exp: hoursToMilliseconds(expires),
  };

  return jwt.sign(tokenPayload, privateKey.toString(), { algorithm: "RS256" });
};

export const verify = (token) => {
  const options = {
    algorithms: ["RS256"],
  };

  return jwt.verify(token, publicKey.toString(), options);
};

export default {
  sign,
  verify
}

