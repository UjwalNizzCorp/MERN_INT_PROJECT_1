import bcrypt from "bcrypt";

export const hashingPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedpassword = await bcrypt.hash(password, salt);
  return hashedpassword;
};

export const comparePassword = async (password, hash) => {
  const res = await bcrypt.compare(password, hash);
  return res;
};
