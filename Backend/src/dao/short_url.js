import urlSchema from "../models/shortUrl.model.js";
import { ConflictError } from "../utils/errorHandler.js";

export const saveShortUrl = async (shortUrl, longUrl, userId) => {
  try {
    const newUrl = new urlSchema({
      full_url: longUrl,
      short_url: shortUrl,
    });

    if (!shortUrl || !longUrl) {
      throw new Error("Short URL and Long URL are required");
    }

    if (userId) {
      newUrl.user_id = userId;
    }

    await newUrl.save();
    return shortUrl;
  } catch (error) {
    throw new ConflictError(error.message);
  }
};

export const getShortUrl = async (shortUrl) => {
  const url = await urlSchema.findOneAndUpdate(
    { short_url: shortUrl },
    { $inc: { clicks: 1 } }
  );
  return url;
};
