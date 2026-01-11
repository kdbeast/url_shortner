import { model, Schema } from "mongoose";

const shortUrlSchema = new Schema({
  full_url: {
    type: String,
    required: true,
  },
  short_url: {
    index: true,
    type: String,
    unique: true,
    required: true,
  },
  clicks: {
    default: 0,
    type: Number,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const shortUrl = model("ShortUrl", shortUrlSchema);
export default shortUrl;
