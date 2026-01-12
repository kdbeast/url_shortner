import shortUrl from "../models/shortUrl.model.js";
import User from "../models/user.model.js";

export const findUserById = async (id) => {
  return await User.findById(id);
};

export const findUserByEmail = async (email, includePassword = false) => {
  const query = User.findOne({ email });
  if (includePassword) {
    query.select("+password");
  }
  return await query;
};

export const createUser = async (name, email, password) => {
  const newUser = new User({ name, email, password });
  await newUser.save();
  return newUser;
};

export const getAllUserUrlsDao = async (id) => {
    return await shortUrl.find({ user: id });
};
