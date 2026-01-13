import bcrypt from "bcrypt";
import { signToken } from "../utils/helper.js";
import { ConflictError } from "../utils/errorHandler.js";
import { UnauthorizedError, BadRequestError } from "../utils/errorHandler.js";
import { createUser, findUserByEmail } from "../dao/user.dao.js";

export const registerService = async (name, email, password) => {
  const user = await findUserByEmail(email);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;

  if (!emailRegex.test(email))
    throw new BadRequestError("Invalid email format");

  if (!passwordRegex.test(password))
    throw new BadRequestError(
      "Password must be minimum 8 characters and contain letters & numbers"
    );

  if (user) throw new ConflictError("User already exists");
  const newUser = await createUser(name, email, password);

  const token = signToken({ id: newUser._id });
  return { token, user: newUser };
};

export const loginService = async (email, password) => {
  const user = await findUserByEmail(email, true);

  if (!user) throw new UnauthorizedError("Invalid credentials");

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) throw new UnauthorizedError("Invalid credentials");

  const token = signToken({ id: user._id });
  return { token, user };
};
