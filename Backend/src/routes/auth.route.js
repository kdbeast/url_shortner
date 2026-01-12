import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { login, register, logout, me } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/me", authMiddleware, me);

export default router;
