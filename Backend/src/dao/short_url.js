import urlSchema from "../models/shortUrl.model.js";
import { ConflictError } from "../utils/errorHandler.js";

export const saveShortUrl = async (shortUrl, longUrl, userId) => {
  try {
    const newUrl = new urlSchema({
      full_url: longUrl,
      short_url: shortUrl,
    });

    if (userId) {
      newUrl.user = userId;
    }

    await newUrl.save();
    return shortUrl;
  } catch (error) {
    if (error.code === 11000) {
      throw new ConflictError("Custom URL already exists");
    }
    throw new Error(error.message);
  }
};

export const getShortUrl = async (shortUrl) => {
  const url = await urlSchema.findOneAndUpdate(
    { short_url: shortUrl },
    { $inc: { clicks: 1 } }
  );
  return url;
};

export const getCustomShortUrl = async (slug) => {
  const url = await urlSchema.findOne({ short_url: slug });
  return url;
};
