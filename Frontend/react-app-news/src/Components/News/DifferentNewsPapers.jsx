import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Loader2 } from "lucide-react"
import { formatDistanceToNow, parseISO } from "date-fns"

const DifferentNewsPapers = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const getNewspaperName = () => {
    const path = location.pathname.toLowerCase()
    if (path.includes("times-of-india")) return "Times of India"
    if (path.includes("the-hindu")) return "The Hindu"
    if (path.includes("indian-express")) return "Indian Express"
    if (path.includes("hindustan-times")) return "Hindustan Times"
    if (path.includes("economic-times")) return "Economic Times"
    return "All News"
  }

  const newspaperName = getNewspaperName()

  const isBreakingNews = (publishedAt) => {
    if (!publishedAt) return false
    const publishedDate = parseISO(publishedAt)
    return new Date() - publishedDate <= 5 * 24 * 60 * 60 * 1000
  }

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true)
      try {
        const response = await fetch(`/api/fetch-diff-newspaper?source=${encodeURIComponent(newspaperName)}`)
        if (!response.ok) throw new Error("Failed to fetch news")
        const data = await response.json()
  
        // Fix: Ensure data is an array
        const articleArray = Array.isArray(data) ? data : data.articles || []
  
        setArticles(articleArray)
        setError(null)
      } catch (err) {
        console.error("Failed to fetch news:", err)
        setError("Failed to load news. Please try again later.")
      } finally {
        setLoading(false)
      }
    }
  
    fetchNews()
  }, [newspaperName])
  

  return (
    <div className="container mx-auto pt-6 px-2 md:px-12">
      <h2 className="text-2xl font-semibold font-[Supreme] text-center mb-6">
        {newspaperName} Headlines
      </h2>

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
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 px-2 md:px-4 lg:12">
            {articles.map((article, index) => (
              <div
                key={index}
                className="bg-white overflow-hidden rounded-lg border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 hover:scale-[1.02] transition-all duration-200 cursor-pointer"
                onClick={() => navigate(`/news/${encodeURIComponent(newspaperName)}?index=${index}`)}
              >
                <div className="relative aspect-video group">
                  <img
                    src={article.image || "/placeholder.svg"}
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
                    <span>{formatDistanceToNow(parseISO(article.publishedAt))} ago</span>
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

export default DifferentNewsPapers
