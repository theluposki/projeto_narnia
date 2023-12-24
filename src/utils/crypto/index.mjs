import { randomUUID } from "node:crypto";
import { genKeyPairHex, sharedKey } from "./KeyPair.mjs";
import { encrypt, decrypt } from "./enc_dec.mjs";
import { generateKeyPEMFile } from "./generateKeyPEMFile.mjs";
import { signature, checkSignature } from "./signature.mjs";
import { alice, bob } from "./alice_and_bob.mjs";

const generateUUID = () => randomUUID();

export {
  generateKeyPEMFile,
  generateUUID,
  genKeyPairHex,
  sharedKey,
  encrypt,
  decrypt,
  signature,
  checkSignature,
  alice,
  bob
};

export default {
  generateKeyPEMFile,
  generateUUID,
  genKeyPairHex,
  sharedKey,
  encrypt,
  decrypt,
  signature,
  checkSignature,
  alice,
  bob
};
