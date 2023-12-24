import elliptic from "elliptic";

const ec = new elliptic.ec("secp256k1");

export const signature = (message, privateKey) => {
  const key = ec.keyFromPrivate(privateKey, "hex");
  const signature = key.sign(message);
  return signature.toDER("hex");
}

export const checkSignature = (message, signature, publicKey) => {
  const key = ec.keyFromPublic(publicKey, "hex");
  return key.verify(message, signature);
}

export default {
  signature,
  checkSignature
}

