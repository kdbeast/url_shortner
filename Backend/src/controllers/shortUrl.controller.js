import { getShortUrl } from "../dao/short_url.js";
import wrapAsync from "../utils/tryCatchWrapper.js";
import { createShortUrlWithoutUser } from "../services/shortUrl.service.js";

export const createShortUrl = wrapAsync(async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).send("URL is required");
  }

  const shortUrl = await createShortUrlWithoutUser(url);

  return res.status(201).send(process.env.APP_URL + shortUrl);
});

export const redirectFromShortUrl = wrapAsync(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send("Short URL is required");
  }

  const url = await getShortUrl(id);

  if (!url) {
    return res.status(404).send("Short URL not found");
  }

  res.redirect(url.full_url);
});
