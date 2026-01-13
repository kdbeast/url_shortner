import { generateNanoId } from "../utils/helper.js";
import { getCustomShortUrl, saveShortUrl } from "../dao/short_url.js";
import { ConflictError } from "../utils/errorHandler.js";

export const createShortUrlWithoutUser = async (url) => {
  const shortUrl = generateNanoId(7);

  if (!shortUrl) {
    throw new Error("Short URL is required");
  }

  await saveShortUrl(shortUrl, url);
  return shortUrl;
};

export const createShortUrlWithUser = async (url, userId, slug = null) => {
  const shortUrl = slug || generateNanoId(7);
  const exist = await getCustomShortUrl(slug);
  if (exist) throw new ConflictError("Custom URL already exists");

  await saveShortUrl(shortUrl, url, userId);
  return shortUrl;
};
