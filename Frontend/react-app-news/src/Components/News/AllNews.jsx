import { useState, useEffect } from "react"
import axios from "axios"
import { Newspaper, Loader2 } from "lucide-react"

const AllNews = () => {
  const [category, setCategory] = useState("general")
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/api/news-by-category?category=${selectedCategory}`
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
      <div className="flex flex-wra justify-center gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleCategoryChange(cat.id)}
            className={`px-4 py-2 rounded-md transition-colors ${
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((article, index) => (
              <div
                key={index}
                className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="h-48 overflow-hidden bg-gray-200">
                  {article.urlToImage ? (
                    <img
                      src={article.urlToImage || "/placeholder.svg"}
                      alt={article.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = "/placeholder.svg?height=200&width=400"
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                      <Newspaper className="w-12 h-12 text-gray-400" />
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-medium bg-gray-100 px-2 py-1 rounded">
                      {article.source.name || "Unknown Source"}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(article.publishedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <h2 className="text-lg font-semibold mb-2 line-clamp-2">
                    {article.title}
                  </h2>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {article.description}
                  </p>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-black hover:underline inline-block"
                  >
                    Read full article
                  </a>
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
