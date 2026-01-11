import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";

export const generateNanoId = (length) => {
  return nanoid(length);
};

export const signToken = (id) => {
  return jwt.sign(id, process.env.JWT_SECRET, { expiresIn: "5m" });
};

export const verifyToken = (token) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  console.log(decoded.id);
};
