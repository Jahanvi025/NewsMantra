import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addToarticles, removeFromarticles, updateToarticles } from "../../features/articleSlice"
import { Link, useSearchParams } from "react-router-dom"
import toast from "react-hot-toast"
import { Search, Edit, Trash2, Copy, Share, Eye, Clock, Calendar } from "lucide-react"
import { format } from "date-fns"

const CreateAndUpdateNote = () => {
  const [title, setTitle] = useState("")
  const [value, setValue] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [searchParams, setSearchParams] = useSearchParams()
  const [editingId, setEditingId] = useState(null)

  const articles = useSelector((state) => state.article.articles)
  const dispatch = useDispatch()

  // Get article ID from URL if editing
  useEffect(() => {
    const articleId = searchParams.get("articleId")
    if (articleId) {
      setEditingId(articleId)
      const articleToEdit = articles.find((article) => article._id === articleId)
      if (articleToEdit) {
        setTitle(articleToEdit.title)
        setValue(articleToEdit.content)
      }
    }
  }, [searchParams, articles])

  // Filter articles based on search term
  const filteredData = articles.filter((article) => article.title.toLowerCase().includes(searchTerm.toLowerCase()))

  // Create or update article
  function handleSaveArticle() {
    if (!title.trim() || !value.trim()) {
      toast.error("Title and content are required")
      return
    }

    const article = {
      title: title,
      content: value,
      _id: editingId || Date.now().toString(36),
      createdAT: editingId
        ? articles.find((article) => article._id === editingId)?.createdAT
        : new Date().toISOString(),
    }

    if (editingId) {
      dispatch(updateToarticles(article))
      setSearchParams({})
      toast.success("Article updated successfully")
    } else {
      dispatch(addToarticles(article))
      toast.success("Article created successfully")
    }

    // Reset form
    setTitle("")
    setValue("")
    setEditingId(null)
  }

  // Delete article
  function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete this article?")) {
      dispatch(removeFromarticles(id))
      toast.success("Article deleted successfully")
    }
  }

  // Format date for display
  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), "MMMM dd, yyyy")
    } catch (error) {
      return dateString
    }
  }

  // Calculate read time (1 min per 200 words)
  const calculateReadTime = (text) => {
    const wordCount = text.trim().split(/\s+/).length
    const readTime = Math.max(1, Math.ceil(wordCount / 200))
    return `${readTime} min read`
  }

  return (
    <div className="relative w-full min-h-screen grid grid-cols-1 lg:grid-cols-2 gap-0">
      {/* Left Column - Form Section */}
      <div className="p-4 md:p-8 lg:p-12">
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 font-[Supreme] leading-tight">
            Add Articles
          </h1>
          <p className="text-black mt-3 font-[Supreme]">
            Create and Update your articles here to note informative current affairs
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-xl font-[Supreme] font-semibold mb-2">
              Title
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                id="title"
                type="text"
                value={title}
                placeholder="Enter your title here"
                className="border font-[Supreme] border-solid border-neutral-500 rounded-lg p-3 w-full"
                onChange={(e) => setTitle(e.target.value)}
              />
              <button
                onClick={handleSaveArticle}
                className="px-6 py-3 rounded-lg font-[Supreme] bg-black text-[#F7374F] hover:text-white transition-colors whitespace-nowrap"
              >
                {editingId ? "Update Article" : "Create Article"}
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="content" className="block text-xl font-[Supreme] font-semibold mb-2">
              Description
            </label>
            <textarea
              id="content"
              value={value}
              className="border border-solid border-neutral-500 rounded-lg p-4 w-full font-[Supreme] resize-none"
              placeholder="Enter content here"
              rows={14}
              onChange={(e) => setValue(e.target.value)}
            ></textarea>
          </div>

          {editingId && (
            <div className="flex justify-end">
              <button
                onClick={() => {
                  setEditingId(null)
                  setTitle("")
                  setValue("")
                  setSearchParams({})
                }}
                className="px-4 py-2 rounded-lg font-[Supreme] bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
              >
                Cancel Editing
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Right Column - Articles Display */}
      <div className="bg-black min-h-screen">
        <div className="p-4 md:p-6 lg:p-8 h-full flex flex-col">
          {/* Header with title and search */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h2 className="text-white font-[Supreme] text-xl">Watch Your Articles</h2>
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white h-4 w-4" />
              <input
                type="search"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-lg w-full sm:w-64 bg-black text-white border border-white font-[Supreme] focus:outline-none focus:ring-2 focus:ring-[#F7374F]"
              />
            </div>
          </div>

          {/* Scrollable articles container */}
          <div className="flex-grow overflow-y-auto pr-2" style={{ maxHeight: "calc(100vh - 120px)" }}>
            {filteredData.length === 0 ? (
              <div className="flex justify-center items-center h-64 text-white font-[Supreme]">
                {searchTerm ? "No articles match your search" : "No articles yet. Create your first one!"}
              </div>
            ) : (
              <div className="space-y-4 pb-4">
                {filteredData.map((article) => (
                  <div
                    key={article._id}
                    className="bg-black border border-white rounded-lg overflow-hidden"
                  >
                    <div className="p-4">
                      <h3 className="font-semibold font-[Supreme] text-white text-lg mb-2">{article.title}</h3>
                      <p className="text-sm font-[Supreme] text-neutral-100 line-clamp-3">{article.content}</p>
                      <div className="flex  font-[Supreme] justify-between items-center mt-4 text-xs text-gray-400">
                        <div className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          <span>{formatDate(article.createdAT)}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-3 h-3 mr-1 " />
                          <span className=" font-[Supreme]">{calculateReadTime(article.content)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap justify-end gap-1 p-3 bg-black">
                      <Link
                        to={`/update/${article._id}`}
                        className="flex items-center gap-1 px-2 py-1 rounded-lg bg-black border border-solid border-white text-white hover:bg-neutral-300 hover:text-red-600 transition-colors text-xs font-[Supreme]"
                      >
                        <Edit size={14} />
                        <span>Edit</span>
                      </Link>

                      <Link
                        to={`/articles/${article._id}`}
                        className="flex items-center gap-1 px-2 py-1 rounded-lg bg-black border border-solid border-white text-white hover:bg-neutral-300 hover:text-red-600 transition-colors text-xs font-[Supreme]"
                      >
                        <Eye size={14} />
                        <span>View</span>
                      </Link>

                      <button
                        onClick={() => handleDelete(article._id)}
                        className="flex items-center gap-1 px-2 py-1 rounded-lg bg-black border border-solid border-white text-white hover:bg-red-600 hover:text-red-600 transition-colors text-xs font-[Supreme]"
                      >
                        <Trash2 size={14} />
                        <span>Delete</span>
                      </button>

                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(article.content)
                          toast.success("Copied to clipboard ☑️")
                        }}
                        className="flex items-center gap-1 px-2 py-1 rounded-lg bg-black border border-solid border-white text-white hover:bg-neutral-300 hover:text-red-600 transition-colors text-xs font-[Supreme]"
                      >
                        <Copy size={14} />
                        <span>Copy</span>
                      </button>

                      <button
                        onClick={() => {
                          const link = `${window.location.origin}/articles/${article._id}`
                          navigator.clipboard.writeText(link)
                          toast.success("Shareable link copied to clipboard! 📋✅")
                        }}
                        className="flex items-center gap-1 px-2 py-1 rounded-lg bg-black border border-solid border-white text-white hover:bg-neutral-300 hover:text-red-600 transition-colors text-xs font-[Supreme]"
                      >
                        <Share size={14} />
                        <span>Share</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateAndUpdateNote

