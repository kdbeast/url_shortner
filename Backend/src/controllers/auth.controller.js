import wrapAsync from "../utils/tryCatchWrapper.js";
import { cookieOptions } from "../config/config.js";
import { loginService, registerService } from "../services/auth.service.js";

export const register = wrapAsync(async (req, res) => {
  const { name, email, password } = req.body;
  const { user, token } = await registerService(name, email, password);
  req.user = user;
  res.cookie("accessToken", token, cookieOptions);

  await user.save();

  const { password: _, ...userWithoutPassword } = user.toObject();
  res.status(201).json({
    user: userWithoutPassword,
    message: "User registered successfully",
  });
});

export const login = wrapAsync(async (req, res) => {
  const { email, password } = req.body;
  const { user, token } = await loginService(email, password);
  req.user = user;

  res.cookie("accessToken", token, cookieOptions);
  const { password: _, ...userWithoutPassword } = user.toObject();
  res.status(201).json({
    user: userWithoutPassword,
    message: "User logged in successfully",
  });
});

export const logout = wrapAsync(async (_, res) => {
  res.clearCookie("accessToken");
  res.status(200).json({ message: "User logged out successfully" });
});

export const me = wrapAsync(async (req, res) => {
  res.status(200).json(req.user);
});
