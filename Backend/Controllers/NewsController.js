import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

// Cache to prevent excessive API requests (valid for 10 mins)
let cachedCurrentAffairs = null;
let cachedFamousHeadlines = null;
let lastFetchTimeCurrentAffairs = 0;
let lastFetchTimeFamousHeadlines = 0;

const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

// 📰 Fetch Current Affairs
const fetchCurrentAffairs = async (req, res) => {
  const now = Date.now();

  try {
    // Serve cached data if recent
    if (cachedCurrentAffairs && now - lastFetchTimeCurrentAffairs < CACHE_DURATION) {
      return res.json(cachedCurrentAffairs);
    }

    const response = await axios.get(
      `https://newsapi.org/v2/everything?q=current affairs&language=en&pageSize=18&apiKey=${process.env.NEWS_API_KEY}`
    );

    if (!response.data.articles || response.data.articles.length === 0) {
      return res.status(404).json({ message: "No current affairs found." });
    }

    // Store cache
    cachedCurrentAffairs = response.data;
    lastFetchTimeCurrentAffairs = now;

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching current affairs:", error.message);
    res.status(500).json({ message: "Error fetching current affairs" });
  }
};

// 🔥 Fetch Famous Headlines (India)
const fetchFamousHeadlines = async (req, res) => {
  const now = Date.now();

  try {
    // Serve cached data if recent
    if (cachedFamousHeadlines && now - lastFetchTimeFamousHeadlines < CACHE_DURATION) {
      return res.json(cachedFamousHeadlines);
    }

    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=us&pageSize=40&apiKey=${process.env.NEWS_API_KEY}`
    );

    if (!response.data.articles || response.data.articles.length === 0) {
      return res.status(404).json({ message: "No famous headlines found." });
    }

    cachedFamousHeadlines = response.data;
    lastFetchTimeFamousHeadlines = now;

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching famous headlines:", error.message);
    res.status(500).json({ message: "Error fetching famous headlines" });
  }
};
const fetchNewsByCategory = async (req, res) => {
  const { category } = req.query;
  const now = Date.now();

  try {
    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=us&category=${category}&pageSize=30&apiKey=${process.env.NEWS_API_KEY}`
    );

    if (!response.data.articles || response.data.articles.length === 0) {
      return res.status(404).json({ message: "No news found for this category." });
    }

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching news by category:", error.message);
    res.status(500).json({ message: "Error fetching news by category." });
  }
};


// Optional: Cache (if needed)
let cachedNewsBySource = {};
let lastFetchTimeBySource = {};

// Mapping readable names to NewsAPI source IDs
const sourceMap = {
  "Times of India": "times-of-india",
  "The Hindu": "the-hindu",
  "Indian Express": "indian-express",
  "Hindustan Times": "hindustan-times",
  "Economic Times": "economic-times",
}


const fetchNewsBySource = async (req, res) => {
  const { source } = req.query;

  if (!source || !sourceMap[source]) {
    return res.status(400).json({ message: "Invalid or missing newspaper source." });
  }

  const sourceId = sourceMap[source];
  const now = Date.now();

  // Serve from cache if available and recent
  if (
    cachedNewsBySource[sourceId] &&
    now - (lastFetchTimeBySource[sourceId] || 0) < CACHE_DURATION
  ) {
    return res.json(cachedNewsBySource[sourceId]);
  }

  try {
    const response = await axios.get(
      `https://gnews.io/api/v4/search?q="${source}"&lang=en&max=18&apikey=${process.env.GNEWS_API_KEY}`
    )    

    if (!response.data.articles || response.data.articles.length === 0) {
      return res.status(404).json({ message: `No news found for ${source}.` });
    }

    // Update cache
    cachedNewsBySource[sourceId] = response.data;
    lastFetchTimeBySource[sourceId] = now;

    res.json(response.data);
  } catch (error) {
    console.error(`Error fetching news from ${source}:`, error.message);
    res.status(500).json({ message: "Error fetching news from source." });
  }
};


export { fetchCurrentAffairs, fetchFamousHeadlines, fetchNewsByCategory, fetchNewsBySource };
