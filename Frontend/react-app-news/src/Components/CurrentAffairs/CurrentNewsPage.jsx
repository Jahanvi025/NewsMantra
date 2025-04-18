"use client"

import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import api from "../../utils/api.js";
import { format } from "date-fns"
import { ArrowLeft, Calendar, Clock, Globe, Share2, Bookmark, Printer, Eye } from "lucide-react"

const CurrentNewsPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [relatedArticles, setRelatedArticles] = useState([])

  useEffect(() => {
    const fetchArticleDetails = async () => {
      try {
        setLoading(true)
        // Fetch all articles first
        const response = await api.get("/api/current-affairs")
        const allArticles = response.data.articles || []

        // Get the specific article by index
        const currentArticle = allArticles[Number.parseInt(id)]
        if (!currentArticle) {
          throw new Error("Article not found")
        }

        setArticle(currentArticle)

        // Get 3 related articles (excluding the current one)
        const filtered = allArticles.filter((_, index) => index !== Number.parseInt(id)).slice(0, 3)
        setRelatedArticles(filtered)
      } catch (error) {
        console.error("Error fetching article:", error)
        setError("Failed to load article. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    fetchArticleDetails()
  }, [id])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg font-[Supreme]">Loading article...</p>
      </div>
    )
  }

  if (error || !article) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <p className="text-red-500 font-[Supreme] text-lg">{error || "Article not found"}</p>
        <button
          onClick={() => navigate("/news")}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg font-[Supreme]"
        >
          Back to News
        </button>
      </div>
    )
  }

  // Format the date for display
  const publishedDate = article.publishedAt ? format(new Date(article.publishedAt), "MMMM dd, yyyy") : "Unknown date"

  // Format the time for display
  const publishedTime = article.publishedAt ? format(new Date(article.publishedAt), "h:mm a") : ""

  return (
    <div className="bg-white min-h-screen mb-10">
      {/* Back button */}
      <div className="container mx-auto px-4 py-6">
        <button
          onClick={() => navigate("/")}
          className="flex items-center text-gray-600 hover:text-red-500 transition-colors font-[Supreme]"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Current Affairs
        </button>
      </div>

      {/* Article header */}
      <div className="container mx-auto px-4 md:px-8 mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="bg-red-100 text-red-600 text-xs font-medium px-3 py-1 rounded-full font-[Supreme]">
            Current Affair
          </span>
          {article.source?.name && (
            <span className="text-xs text-gray-500 font-[Supreme] border border-gray-200 px-2 py-1 rounded-full">
              {article.source.name}
            </span>
          )}
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-[Supreme] leading-tight mb-4">
          {article.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            <span className="font-[Supreme]">{publishedDate}</span>
          </div>
          {publishedTime && (
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              <span className="font-[Supreme]">{publishedTime}</span>
            </div>
          )}
          {article.author && (
            <div className="flex items-center">
              <span className="font-[Supreme]">By {article.author}</span>
            </div>
          )}
        </div>
      </div>

      {/* Featured image */}
      <div className="container mx-auto px-4 md:px-8 mb-8">
        <div className="relative aspect-video md:aspect-[21/9] overflow-hidden rounded-lg">
          <img
            src={article.urlToImage || `/placeholder.svg?height=600&width=1200`}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>
        {article.urlToImage && (
          <p className="text-xs text-gray-500 mt-2 italic font-[Supreme]">
            Image: {article.source?.name || "News Source"}
          </p>
        )}
      </div>

      {/* Article content and sidebar */}
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main content */}
          <div className="lg:w-2/3">
            {/* Article tools */}
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
              <div className="flex gap-3">
                <button className="text-gray-500 hover:text-red-500 transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
                <button className="text-gray-500 hover:text-red-500 transition-colors">
                  <Bookmark className="w-5 h-5" />
                </button>
                <button className="text-gray-500 hover:text-red-500 transition-colors">
                  <Printer className="w-5 h-5" />
                </button>
              </div>
              <div className="flex items-center text-gray-500 text-sm">
                <Eye className="w-4 h-4 mr-1" />
                <span className="font-[Supreme]">{Math.floor(Math.random() * 1000) + 100} views</span>
              </div>
            </div>

            {/* Article description */}
            <div className="mb-6">
              <p className="text-lg font-semibold text-gray-700 font-[Supreme] mb-4">{article.description}</p>
            </div>

            {/* Article content */}
            <div className="prose max-w-none font-[Supreme]">
              {/* Since the API doesn't provide full content, we'll generate some placeholder content */}
              <p>
                {article.content ||
                  `${article.description} This article provides in-depth coverage of this important topic.
                  The implications of these developments are far-reaching and could affect various sectors
                  including economy, politics, and social welfare.`}
              </p>

              <p className="mt-4">
                Experts have weighed in on this matter, suggesting that these events could lead to significant changes
                in how we approach similar situations in the future. The immediate response from officials has been
                measured, with calls for calm and rational discussion.
              </p>

              <p className="mt-4">
                Public reaction has been mixed, with some expressing support while others voice concerns about potential
                consequences. Social media has been abuzz with discussions, highlighting the importance of this issue in
                the current social and political climate.
              </p>

              <p className="mt-4">
                As this story develops, we will continue to provide updates and analysis. For now, it remains a
                significant topic that deserves attention and thoughtful consideration from all stakeholders involved.
              </p>

              {article.url && (
                <div className="mt-8 flex items-center">
                  <Globe className="w-4 h-4 mr-2 text-gray-500" />
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-500 hover:underline font-[Supreme]"
                  >
                    Read the full article at the source
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            <div className="sticky top-6">
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <h3 className="text-lg font-bold font-[Supreme] mb-4">Related Articles</h3>
                <div className="space-y-4">
                  {relatedArticles.map((relatedArticle, index) => (
                    <div
                      key={index}
                      className="flex gap-3 cursor-pointer hover:bg-gray-100 p-2 rounded-lg transition-colors"
                      onClick={() => {
                        // Find the index of this article in the original array
                        navigate(`/news/currentnews/${index < Number.parseInt(id) ? index : index + 1}`)
                        window.scrollTo(0, 0)
                      }}
                    >
                      <div className="w-20 h-20 flex-shrink-0">
                        <img
                          src={relatedArticle.urlToImage || `/placeholder.svg?height=80&width=80`}
                          alt={relatedArticle.title}
                          className="w-full h-full object-cover rounded"
                        />
                      </div>
                      <div>
                        <h4 className="font-[Supreme] font-medium text-sm line-clamp-2">{relatedArticle.title}</h4>
                        <p className="text-xs text-gray-500 mt-1 font-[Supreme]">
                          {relatedArticle.publishedAt
                            ? format(new Date(relatedArticle.publishedAt), "MMM dd, yyyy")
                            : "Unknown date"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default CurrentNewsPage

