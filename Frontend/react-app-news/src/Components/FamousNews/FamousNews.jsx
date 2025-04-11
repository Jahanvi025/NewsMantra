import { useEffect, useState } from "react"
import axios from "axios"
import api from "../../utils/api.js";
import { format } from "date-fns"
import { ArrowRight, Clock } from "lucide-react"

const FamousNews = () => {
  const [featuredArticle, setFeaturedArticle] = useState(null)
  const [sidebarArticles, setSidebarArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  // Function to determine category based on article content
  const determineCategory = (article) => {
    const title = article.title?.toLowerCase() || ""
    const description = article.description?.toLowerCase() || ""
    const content = article.content?.toLowerCase() || ""
    const combinedText = title + " " + description + " " + content

    if (
      combinedText.includes("tech") ||
      combinedText.includes("technology") ||
      combinedText.includes("ai") ||
      combinedText.includes("digital")
    ) {
      return "Technology"
    } else if (
      combinedText.includes("economy") ||
      combinedText.includes("market") ||
      combinedText.includes("finance") ||
      combinedText.includes("business")
    ) {
      return "Economy"
    } else if (
      combinedText.includes("politic") ||
      combinedText.includes("government") ||
      combinedText.includes("election")
    ) {
      return "Politics"
    } else if (
      combinedText.includes("health") ||
      combinedText.includes("medical") ||
      combinedText.includes("disease") ||
      combinedText.includes("treatment")
    ) {
      return "Health"
    } else if (
      combinedText.includes("sport") ||
      combinedText.includes("football") ||
      combinedText.includes("cricket") ||
      combinedText.includes("game")
    ) {
      return "Sports"
    } else if (
      combinedText.includes("environment") ||
      combinedText.includes("climate") ||
      combinedText.includes("pollution")
    ) {
      return "Environment"
    } else {
      return "General"
    }
  }

  // Function to format the published time
  const formatPublishedTime = (publishedAt) => {
    if (!publishedAt) return "Recently"

    try {
      const publishedDate = new Date(publishedAt)
      const hoursAgo = Math.floor((new Date() - publishedDate) / (1000 * 60 * 60))

      if (hoursAgo < 24) {
        return `${hoursAgo} hours ago`
      } else {
        return format(publishedDate, "MMM d, yyyy")
      }
    } catch (error) {
      return "Recently"
    }
  }

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true)

        // Fetch famous headlines
        const headlinesResponse = await api.get("/api/famous-headlines")
        const headlinesArticles = headlinesResponse.data.articles.reverse() || []

        if (headlinesArticles.length > 0) {
          // Set the first article as featured
          setFeaturedArticle({
            ...headlinesArticles[0],
            category: determineCategory(headlinesArticles[0]),
          })

          // Set the rest as sidebar articles
          setSidebarArticles(
            headlinesArticles.slice(1).map((article) => ({
              ...article,
              category: determineCategory(article),
            })),
          )
        } else {
          setError("No headlines found")
        }
      } catch (error) {
        console.error("Error fetching news:", error)
        setError("Failed to load news. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

  // Handle click on sidebar article to make it the featured article
  const handleArticleClick = (article) => {
    setFeaturedArticle(article)

    // Remove the clicked article from sidebar and add current featured to sidebar
    if (featuredArticle) {
      setSidebarArticles([featuredArticle, ...sidebarArticles.filter((item) => item.title !== article.title)])
    }

    // Scroll to top on mobile
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-[Supreme]">Loading headlines...</p>
      </div>
    )
  }

  if (error || !featuredArticle) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500 font-[Supreme]">{error || "No headlines available"}</p>
      </div>
    )
  }

  return (
    <div className="bg-white min-h-screen px-2 md:px-12">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Featured Article - Left Side */}
          <div className="lg:w-2/3">
            <div className="mb-6">
              <span className="inline-block bg-red-500 text-white text-sm font-medium px-3 py-1 rounded-full font-[Supreme]">
                Breaking News
              </span>
            </div>

            <h1 className="text-xl sm:text-3xl md:text-4xl font-bold font-[Supreme] leading-tight mb-4">
              {featuredArticle.title}
            </h1>

            <p className="text-gray-600 mb-4 font-[Supreme]">
              {featuredArticle.description || "No description available for this article."}
            </p>

            <div className="flex items-center text-gray-500 mb-6 text-sm">
              <span className="font-[Supreme]">By {featuredArticle.author || "Staff Reporter"}</span>
              <span className="mx-2">•</span>
              <Clock className="w-4 h-4 mr-1" />
              <span className="font-[Supreme]">{formatPublishedTime(featuredArticle.publishedAt)}</span>
            </div>

            {featuredArticle.urlToImage && (
              <div className="mb-6">
                <img
                  src={featuredArticle.urlToImage || "/placeholder.svg"}
                  alt={featuredArticle.title}
                  className="w-full h-auto rounded-lg object-cover"
                  style={{ maxHeight: "500px" }}
                  onError={(e) => {
                    e.target.src = `/placeholder.svg?height=500&width=800`
                  }}
                />
                <p className="text-xs text-gray-500 mt-2 font-[Supreme]">
                  Image: {featuredArticle.source?.name || "News Source"}
                </p>
              </div>
            )}

            <div className="prose max-w-none font-[Supreme]">
              <p className="mb-4">
                {featuredArticle.content?.split("[+")[0] ||
                  `${featuredArticle.description} This article provides comprehensive coverage of this important development.`}
              </p>

              <p className="mb-4">
                The implications of this news are significant and could have far-reaching effects across various
                sectors. Experts are closely monitoring the situation and providing analysis on potential outcomes and
                impacts.
              </p>

              <p className="mb-4">
                Public reaction has been mixed, with many expressing interest in how this will unfold in the coming days
                and weeks. Officials have issued statements addressing key concerns and outlining next steps.
              </p>

              {featuredArticle.url && (
                <a
                  href={featuredArticle.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-red-500 hover:text-red-700 font-medium mt-4"
                >
                  Read full article
                  <ArrowRight className="ml-2 w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Sidebar - Right Side */}
          <div className="lg:w-1/3">
            <div className="sticky top-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold font-[Supreme]">Top Stories</h2>
                <a href="#" className="text-sm text-gray-500 hover:text-red-500 font-[Supreme]">
                  View All
                </a>
              </div>

              <div className="overflow-y-auto pr-2" style={{ maxHeight: "calc(100vh - 100px)" }}>
                {sidebarArticles.map((article, index) => (
                  <div
                    key={index}
                    className="mb-6 pb-6 border-b border-gray-100 last:border-0 cursor-pointer"
                    onClick={() => handleArticleClick(article)}
                  >
                    <div className="flex flex-col sm:flex-row gap-4">
                      {article.urlToImage && (
                        <div className="sm:w-1/3">
                          <img
                            src={article.urlToImage || "/placeholder.svg"}
                            alt={article.title}
                            className="w-full h-24 object-cover rounded"
                            onError={(e) => {
                              e.target.src = `/placeholder.svg?height=100&width=150`
                            }}
                          />
                        </div>
                      )}
                      <div className={article.urlToImage ? "sm:w-2/3" : "w-full"}>
                        <div className="mb-2">
                          <span className="text-xs font-medium text-gray-700 bg-gray-100 px-2 py-1 rounded font-[Supreme]">
                            {article.category}
                          </span>
                        </div>
                        <h3 className="font-[Supreme] text-base line-clamp-2 hover:text-red-500 transition-colors">
                          {article.title}
                        </h3>
                        <div className="flex items-center mt-2 text-xs text-gray-500">
                          <Clock className="w-3 h-3 mr-1" />
                          <span className="font-[Supreme]">{formatPublishedTime(article.publishedAt)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FamousNews

