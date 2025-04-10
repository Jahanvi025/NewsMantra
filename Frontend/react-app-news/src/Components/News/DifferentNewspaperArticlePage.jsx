import React, { useEffect, useState } from "react"
import { useParams, useNavigate, useLocation } from "react-router-dom"
import { format } from "date-fns"
import {
    ArrowLeft,
    Calendar,
    Clock,
    Globe,
    Share2,
    Bookmark,
    Printer,
    Eye
} from "lucide-react"

const DifferentNewspaperArticlePage = () => {
    const { newspaperName } = useParams()
    const navigate = useNavigate()
    const location = useLocation()

    const [article, setArticle] = useState(null)
    const [relatedArticles, setRelatedArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    const queryParams = new URLSearchParams(location.search)
    const index = parseInt(queryParams.get("index"))

    useEffect(() => {
        const fetchArticleData = async () => {
            try {
                setLoading(true)

                const response = await fetch(`/api/fetch-diff-newspaper?source=${encodeURIComponent(newspaperName)}`)
                const data = await response.json()
                const articles = Array.isArray(data) ? data : data.articles || []

                if (isNaN(index) || index < 0 || index >= articles.length) {
                    throw new Error("Invalid article index")
                }

                setArticle(articles[index])
                setRelatedArticles(articles.filter((_, i) => i !== index).slice(0, 3))
                setError("")
            } catch (err) {
                console.error(err)
                setError("Failed to load article.")
            } finally {
                setLoading(false)
            }
        }

        fetchArticleData()
    }, [newspaperName, index])

    const publishedDate = article?.publishedAt ? format(new Date(article.publishedAt), "MMMM dd, yyyy") : "Unknown date"
    const publishedTime = article?.publishedAt ? format(new Date(article.publishedAt), "h:mm a") : ""

    if (loading) {
        return <div className="flex justify-center items-center min-h-screen">Loading article...</div>
    }

    if (error || !article) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen">
                <p className="text-red-500 font-[Supreme] text-lg">{error}</p>
                <button
                    onClick={() => navigate(-1)}
                    className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg font-[Supreme]"
                >
                    Back
                </button>
            </div>
        )
    }

    return (
        <div className="bg-white min-h-screen mb-10 px-2 sm:px-2 md:px-6 lg:px-12">

            <div className="container mx-auto px-4 py-6">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center text-gray-600 hover:text-red-500 font-[Supreme]"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                </button>
            </div>

            <div className="container mx-auto px-4 md:px-8 mb-8">
                <div className="flex flex-wrap items-center gap-2 mb-4">
                    <span className="bg-red-100 text-red-600 text-xs font-medium px-3 py-1 rounded-full font-[Supreme]">
                        {decodeURIComponent(newspaperName)}
                    </span>
                    {article.source?.name && (
                        <span className="text-xs text-gray-500 font-[Supreme] border border-gray-200 px-2 py-1 rounded-full">
                            {article.source.name}
                        </span>
                    )}
                </div>
                <h1 className="text-xl md:text-3xl font-bold font-[Supreme] mb-4">{article.title}</h1>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
                    <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1 font-[Supreme]" />
                        {publishedDate}
                    </div>
                    {publishedTime && (
                        <div className="flex items-center font-[Supreme]">
                            <Clock className="w-4 h-4 mr-1" />
                            {publishedTime}
                        </div>
                    )}
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-8 mb-8">
                <div className="relative aspect-video md:aspect-[21/9] overflow-hidden rounded-lg">
                    <img
                        src={article.image || `/placeholder.svg?height=600&width=1200`}
                        alt={article.title}
                        className="w-full h-full object-cover"
                    />
                </div>
                {article.image && (
                    <p className="text-xs text-gray-500 mt-2 italic font-[Supreme]">
                        Image: {article.source?.name || "News Source"}
                    </p>
                )}
            </div>

            <div className="container mx-auto px-4 md:px-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="lg:w-2/3">
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
                            <div className="flex items-center text-gray-500 text-sm font-[Supreme]">
                                <Eye className="w-4 h-4 mr-1" />
                                {Math.floor(Math.random() * 1000) + 100} views
                            </div>
                        </div>

                        <div className="prose max-w-none font-[Supreme]">
                            <p className=" md:text-base lg:text-lg font-semibold text-gray-700 mb-3 sm:mb-4">
                                {article.description}
                            </p>

                            <p>{article.content || `${article.description} More insights and details to follow.`}</p>
                            <p className="mt-4">Stay tuned for further developments on this topic.</p>

                            {article.url && (
                                <div className="mt-8 flex items-center">
                                    <Globe className="w-4 h-4 mr-2 text-gray-500" />
                                    <a
                                        href={article.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-red-500 hover:underline font-[Supreme]"
                                    >
                                        Read the full article
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="lg:w-1/3">
                        <div className="sticky top-6">
                            <div className="bg-gray-50 p-6 rounded-lg mb-6">
                                <h3 className="text-lg font-bold font-[Supreme] mb-4">Related Articles</h3>
                                <div className="space-y-4">
                                    {relatedArticles.map((a, i) => (
                                        <div
                                            key={i}
                                            className="flex gap-3 cursor-pointer hover:bg-gray-100 p-2 rounded-lg transition-colors"
                                            onClick={() => {
                                                navigate(`/news/${encodeURIComponent(newspaperName)}?index=${i}`)
                                                window.scrollTo(0, 0)
                                            }}
                                        >
                                            <div className="w-20 h-20 flex-shrink-0">
                                                <img
                                                    src={a.image || `/placeholder.svg?height=80&width=80`}
                                                    alt={a.title}
                                                    className="w-full h-full object-cover rounded"
                                                />
                                            </div>
                                            <div>
                                                <h4 className="font-[Supreme] font-medium text-sm line-clamp-2">{a.title}</h4>
                                                <p className="text-xs text-gray-500 mt-1 font-[Supreme]">
                                                    {a.publishedAt
                                                        ? format(new Date(a.publishedAt), "MMM dd, yyyy")
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

export default DifferentNewspaperArticlePage
