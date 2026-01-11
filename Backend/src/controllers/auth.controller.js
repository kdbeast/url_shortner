import wrapAsync from "../utils/tryCatchWrapper.js";
import { cookieOptions } from "../config/config.js";
import { loginService, registerService } from "../services/auth.service.js";

export const register = wrapAsync(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const token = await registerService(name, email, password);

  res.cookie("accessToken", token, cookieOptions);

  res.status(201).json({ token, message: "User registered successfully" });
});

export const login = wrapAsync(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const token = await loginService(email, password);

  res.cookie("accessToken", token, cookieOptions);

  res.status(201).json({ token, message: "User logged in successfully" });
});
