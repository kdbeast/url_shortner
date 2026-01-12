import axiosInstance from "../utils/axiosInstance";

export const registerUser = async (name, password, email) => {
  const { data } = await axiosInstance.post("/api/auth/register", {
    name,
    password,
    email,
  });
  return data;
};

export const loginUser = async (password, email) => {
  const { data } = await axiosInstance.post("/auth/login", {
    password,
    email,
  });
  return data;
};

export const logoutUser = async () => {
  const { data } = await axiosInstance.post("/auth/logout");
  return data;
};
