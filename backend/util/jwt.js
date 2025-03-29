import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../constance/env";
export const generateToken = (userId) => {
  const token = jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: "15d",
  });
  return token;
};

export const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: "15d",
  });

  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
  });
};

export const validateToken = (token) => {
  const decode = jwt.verify(token, process.env.JWT_SECRET);
  if (!decode) {
    throw new Error("Invalid token");
  } else {
    return decode;
  }
};
