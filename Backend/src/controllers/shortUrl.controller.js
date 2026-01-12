import {
  createShortUrlWithoutUser,
  createShortUrlWithUser,
} from "../services/shortUrl.service.js";
import { getShortUrl } from "../dao/short_url.js";
import wrapAsync from "../utils/tryCatchWrapper.js";
import { NotFoundError, BadRequestError } from "../utils/errorHandler.js";

export const createShortUrl = wrapAsync(async (req, res) => {
  const data = req.body;
  let shortUrl;
  if (req.user) {
    shortUrl = await createShortUrlWithUser(data.url, req.user._id, data.slug);
  } else {
    shortUrl = await createShortUrlWithoutUser(data.url, data.slug);
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
  const data = req.body;
  if (!data.url) throw new BadRequestError("URL is required");
  const shortUrl = createShortUrlWithUser(data.url, req.user._id, data.slug);
  return res.status(201).send({ shortUrl: process.env.APP_URL + shortUrl });
});
