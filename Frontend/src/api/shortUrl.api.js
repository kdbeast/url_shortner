import axiosInstance from "../utils/axiosInstance";

export const createShortUrl = async (url, customSlug) => {
  try {
    const { data } = await axiosInstance.post("/create", {
      url,
      slug: customSlug,
    });
    return data.shortUrl;
  } catch (error) {
    console.error("Error creating short URL");
    throw error;
  }
};
