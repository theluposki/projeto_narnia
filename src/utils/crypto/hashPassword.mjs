import bcrypt from "bcryptjs";

export const hash = async (password) => {
  const salt = await bcrypt.genSalt(12);
  const hashPassword = await bcrypt.hash(password, salt);
  return hashPassword;
};

export const compare = async (password, hashPassword) => {
  return await bcrypt.compare(password, hashPassword);
};

export default {
  hash,
  compare
}
