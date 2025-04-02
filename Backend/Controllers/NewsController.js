import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

// Cache data to prevent excessive API requests (valid for 10 mins)
let cachedData = null;
let lastFetchTime = 0;

const currentAffairs = async (req, res) => {
  const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes
  const now = Date.now();

  try {
    // Serve cached data if recent
    if (cachedData && now - lastFetchTime < CACHE_DURATION) {
      return res.json(cachedData);
    }

    const response = await axios.get(
      `https://newsapi.org/v2/everything?q=current affairs&language=en&pageSize=18&apiKey=${process.env.NEWS_API_KEY}`
    );

    if (!response.data.articles || response.data.articles.length === 0) {
      return res.status(404).json({ message: "No articles found." });
    }

    // Store cache
    cachedData = response.data;
    lastFetchTime = now;

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching news:", error.message);
    res.status(500).json({ message: "Error fetching news" });
  }
};

export { currentAffairs };
