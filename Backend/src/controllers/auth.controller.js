import wrapAsync from "../utils/tryCatchWrapper.js";
import { cookieOptions } from "../config/config.js";
import { loginService, registerService } from "../services/auth.service.js";

export const register = wrapAsync(async (req, res) => {
  const { name, email, password } = req.body;
  const {user} = await registerService(name, email, password);
  req.user = user;
  const token = user.accessToken;
  res.cookie("accessToken", token, cookieOptions);

  res.status(201).json({ user, message: "User registered successfully" });
});

export const login = wrapAsync(async (req, res) => {
  const { email, password } = req.body;
  const { user, token } = await loginService(email, password);
  req.user = user;
  console.log(token);
  
  res.cookie("accessToken", token, cookieOptions);
  res.status(201).json({ user, message: "User logged in successfully" });
});
