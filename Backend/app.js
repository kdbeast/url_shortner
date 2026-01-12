import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import authRoute from "./src/routes/auth.route.js";
import { attachUser } from "./src/utils/attachUser.js";
import connectDB from "./src/config/mongoose.config.js";
import shortUrlRoute from "./src/routes/shortUrl.route.js";
import { errorHandler } from "./src/utils/errorHandler.js";
import { redirectFromShortUrl } from "./src/controllers/shortUrl.controller.js";

dotenv.config(); // Simplified config call

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(attachUser);
app.use("/api/auth", authRoute);
app.use("/api/create", shortUrlRoute);
app.get("/:id", redirectFromShortUrl);

app.use(errorHandler);

app.listen(3000, () => {
  console.log(`Server running on port 3000`);
  connectDB();
});

// GET - Redirect
// POST - Create short URL
