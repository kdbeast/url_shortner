import dotenv from "dotenv";
import express from "express";
import { nanoid } from "nanoid";
import cors from "cors";
import urlSchema from "./src/models/shortUrl.model.js";
import connectDB from "./src/config/mongoose.config.js";

dotenv.config(); // Simplified config call

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/api/create", async (req, res) => {
  const { url } = req.body;
  if (!url) {
    return res.status(400).send("URL is required");
  }

  const shortUrl = nanoid(7);
  const newUrl = new urlSchema({
    full_url: url,
    short_url: shortUrl,
  });

  await newUrl.save();
  res.send(shortUrl);
});

app.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const url = await urlSchema.findOne({ short_url: id });
    if (url) {
      res.redirect(url.full_url);
    } else {
      res.status(404).send("URL not found");
    }
  } catch (error) {
    console.error("Error finding URL:", error);
    res.status(500).send("Server error");
  }
});

app.listen(3000, () => {
  console.log(`Server running on port 3000`);
  connectDB();
});

// GET - Redirect
// POST - Create short URL
