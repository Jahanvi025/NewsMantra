import { TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import api from "../../utils/api.js";
import { formatDistanceToNow, parseISO } from "date-fns";
import { useNavigate } from "react-router-dom";


const CurrentAffairs = () => {
  const [articles, setArticles] = useState([]);
  const [visibleArticles, setVisibleArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const articlesPerPage = 6;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await api.get("/api/current-affairs");
        setArticles((response.data.articles || []).reverse()); // Newest articles first
      } catch (error) {
        console.error("Error fetching news:", error);
        setError("Failed to load news. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  useEffect(() => {
    if (articles.length > 0) {
      setVisibleArticles(articles.slice(0, page * articlesPerPage));
    }
  }, [articles, page]);

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const hasMoreArticles = articles.length > visibleArticles.length;

  // Function to check if the article was published within the last 5 days
  const isBreakingNews = (publishedAt) => {
    if (!publishedAt) return false;
    const publishedDate = parseISO(publishedAt);
    return new Date() - publishedDate <= 5 * 24 * 60 * 60 * 1000; // Less than 5 days
  };

  return (
    <section className="relative py-8 mt-2 bg-white px-4 md:px-8 lg:px-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div className="flex items-center mb-2 sm:mb-0">
          <h2 className="text-xl font-bold font-[Supreme] tracking-tight">Current Affairs</h2>
          <TrendingUp className="ml-2 h-5 w-5 text-red-500" />
        </div>
        <p className="text-sm text-gray-600 font-[Supreme]">Last updated: less than a minute ago</p>
      </div>

      {/* Show loading or error messages */}
      {loading && <p className="text-black font-[Supreme]">Loading news...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* If no articles found */}
      {!loading && articles.length === 0 && <p className="font-[Supreme]">No news articles available.</p>}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visibleArticles.map((item, index) => (
          <div
            key={index}
            className="bg-white overflow-hidden rounded-lg border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 hover:scale-[1.02] transition-all duration-200 cursor-pointer"
            onClick={() => navigate(`/news/currentnews/${index}`)}
          >
            <div className="relative aspect-video group">
              <img
                src={item.urlToImage || `/placeholder.svg?height=200&width=400`}
                alt={item.title}
                className="object-cover w-full h-full transition-all group-hover:brightness-75"
              />
              {isBreakingNews(item.publishedAt) && (
                <div className="absolute top-3 right-3">
                  <span className="bg-red-500 text-white text-xs font-medium px-3 py-1 rounded-full">Breaking</span>
                </div>
              )}
            </div>
            <div className="p-4">
              <div className="mb-2">
                <span className="text-sm font-medium text-gray-700 font-[Supreme] border border-solid border-neutral-200 px-2 py-1 rounded">
                  Current Affair
                </span>
              </div>
              <h3 className="text-lg font-[Supreme] font-semibold line-clamp-2 mb-2">
                {item.title.length > 50 ? item.title.substring(0, 50) + "..." : item.title}
              </h3>
              <p className="text-sm font-[Supreme] text-gray-600 mt-2 mb-2 line-clamp-3">
                {item.description || "No description available"}
              </p>
              <div className="flex justify-between items-center mt-4 text-xs text-gray-500 font-[Supreme]">
                <span>{item.source?.name || "Unknown Source"}</span>
                <span>{formatDistanceToNow(new Date(item.publishedAt))} ago</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {hasMoreArticles && (
        <div className="flex justify-center mt-8">
          <button
            onClick={loadMore}
            className="border border-gray-300 hover:bg-gray-50 text-gray-700 font-[Supreme] px-4 py-2 rounded"
          >
            Load More
          </button>
        </div>
      )}
    </section>
  );
};

export default CurrentAffairs;
