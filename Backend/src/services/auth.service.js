import { signToken } from "../utils/helper.js";
import { ConflictError } from "../utils/errorHandler.js";
import { UnauthorizedError } from "../utils/errorHandler.js";
import { createUser, findUserByEmail } from "../dao/user.dao.js";

export const registerService = async (name, email, password) => {
  console.log("here in register service", name, email, password);
  const user = await findUserByEmail(email);

  if (user) throw new ConflictError("User already exists");
  console.log("user not found. creating one");
  const newUser = await createUser(name, email, password);

  const token = signToken({ id: newUser._id });
  return { token, user: newUser };
};

export const loginService = async (email, password) => {
  const user = await findUserByEmail(email, true);

  if (!user || user.password !== password)
    throw new UnauthorizedError("Invalid credentials");

  const token = signToken({ id: user._id });
  return { token, user };
};
