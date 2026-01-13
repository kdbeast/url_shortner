import {
  createShortUrlWithoutUser,
  createShortUrlWithUser,
} from "../services/shortUrl.service.js";
import { getShortUrl } from "../dao/short_url.js";
import wrapAsync from "../utils/tryCatchWrapper.js";
import { NotFoundError, BadRequestError } from "../utils/errorHandler.js";

export const createShortUrl = wrapAsync(async (req, res) => {
  const data = req.body;
  const slug = data.slug || data.customSlug;
  let shortUrl;
  if (req.user) {
    shortUrl = await createShortUrlWithUser(data.url, req.user._id, slug);
  } else {
    shortUrl = await createShortUrlWithoutUser(data.url);
  }
  return res.status(201).send({ shortUrl: process.env.APP_URL + shortUrl });
});

export const redirectFromShortUrl = wrapAsync(async (req, res) => {
  const { id } = req.params;
  const url = await getShortUrl(id);
  if (!url) throw new NotFoundError("Short URL not found");
  res.redirect(url.full_url);
});

export const createCustomShortUrl = wrapAsync(async (req, res) => {
  const { url, customSlug } = req.body;
  const shortUrl = await createShortUrlWithUser(url, req.user?._id, customSlug);
  return res.status(201).send({ shortUrl: process.env.APP_URL + shortUrl });
});
