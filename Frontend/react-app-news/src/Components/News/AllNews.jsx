import { useState, useEffect } from "react"
import axios from "axios"
import api from "../../utils/api.js";
import {  Loader2 } from "lucide-react"
import { formatDistanceToNow, parseISO } from "date-fns";
import { useNavigate } from "react-router-dom";

const AllNews = () => {
  const [category, setCategory] = useState("general")
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const navigate = useNavigate();

  const isBreakingNews = (publishedAt) => {
    if (!publishedAt) return false;
    const publishedDate = parseISO(publishedAt);
    return new Date() - publishedDate <= 5 * 24 * 60 * 60 * 1000;
  };


  const categories = [
    { id: "general", name: "General" },
    { id: "politics", name: "Politics" },
    { id: "business", name: "Business" },
    { id: "technology", name: "Technology" },
    { id: "entertainment", name: "Entertainment" },
    { id: "sports", name: "Sports" },
    { id: "science", name: "Science" },
    { id: "health", name: "Health" },
  ]

  const fetchNewsByCategory = async (selectedCategory) => {
    setLoading(true)
    setError(null)

    try {
      const response = await api.get(`/api/news-by-category?category=${selectedCategory}`
      )

      if (response.data.articles && response.data.articles.length > 0) {
        setNews(response.data.articles)
      } else {
        setNews([])
        setError("No news found for this category")
      }
    } catch (err) {
      console.error("Error fetching news:", err)
      setError("Failed to fetch news. Please try again later.")
      setNews([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNewsByCategory(category)
  }, [category])

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory)
  }

  return (
    <div className="container mx-auto py-8">

      {/* Category buttons */}
<div className="flex flex-wrap justify-center gap-2 px-4 sm:px-8 mb-8">
  {categories.map((cat) => (
    <button
      key={cat.id}
      onClick={() => handleCategoryChange(cat.id)}
      className={`px-4 py-2 text-sm sm:text-base rounded-md transition-colors ${
        category === cat.id
          ? "bg-black text-white font-[Supreme]"
          : "bg-gray-200 hover:bg-gray-300 text-black font-[Supreme]"
      }`}
    >
      {cat.name}
    </button>
  ))}
</div>


      {/* News content */}
      <div className="mt-6">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
          </div>
        ) : error ? (
          <div className="text-center p-8 bg-gray-100 rounded-lg">
            <p className="text-red-500">{error}</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 px-2 md:px-12">
            {news.map((article, index) => (
              <div
                key={index}
                className="bg-white overflow-hidden rounded-lg border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 hover:scale-[1.02] transition-all duration-200 cursor-pointer"
                onClick={() => navigate(`/news/${category}/${index}`)}

              >
                <div className="relative aspect-video group">
                  <img
                    src={article.urlToImage || `/placeholder.svg?height=200&width=400`}
                    alt={article.title}
                    className="object-cover w-full h-full transition-all group-hover:brightness-75"
                  />
                  {isBreakingNews(article.publishedAt) && (
                    <div className="absolute top-3 right-3">
                      <span className="bg-red-500 text-white text-xs font-medium px-3 py-1 rounded-full">Breaking</span>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="mb-2">
                    <span className="text-sm font-medium text-gray-700 font-[Supreme] border border-solid border-neutral-200 px-2 py-1 rounded">
                      {article.source?.name || "Unknown"}
                    </span>
                  </div>
                  <h3 className="text-lg font-[Supreme] font-semibold line-clamp-2 mb-2">
                    {article.title?.length > 50 ? article.title.substring(0, 50) + "..." : article.title}
                  </h3>
                  <p className="text-sm font-[Supreme] text-gray-600 mt-2 mb-2 line-clamp-3">
                    {article.description || "No description available"}
                  </p>
                  <div className="flex justify-between items-center mt-4 text-xs text-gray-500 font-[Supreme]">
                    <span>{article.source?.name || "Unknown Source"}</span>
                    <span>{formatDistanceToNow(new Date(article.publishedAt))} ago</span>
                  </div>
                </div>
              </div>
            ))}
          </div>


        )}
      </div>
    </div>
  )
}

export default AllNews
