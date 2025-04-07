import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import {
  Search,
  Edit,
  Trash2,
  Copy,
  Share,
  Eye,
  Clock,
  Calendar,
} from "lucide-react";
import { format } from "date-fns";

const CreateAndUpdateNote = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [articles, setArticles] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const capitalizeTitle = (input) =>
    input.replace(/\b\w/g, (char) => char.toUpperCase());

  const fetchArticles = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const config = user?.token
        ? { headers: { Authorization: `Bearer ${user.token}` } }
        : {};

      const res = await axios.get("/article/all", config);
      setArticles(res.data.articles || []);
    } catch (err) {
      console.error("Error fetching articles", err);
      toast.error("Failed to load articles");
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  useEffect(() => {
    const articleId = searchParams.get("articleId");
    if (articleId && articles.length > 0) {
      const articleToEdit = articles.find((a) => a._id === articleId);
      if (articleToEdit) {
        setEditingId(articleId);
        setTitle(articleToEdit.title);
        setValue(articleToEdit.description || articleToEdit.content);
      }
    }
  }, [searchParams, articles]);

  const filteredData = articles.filter((article) =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSaveArticle = async () => {
    if (!title.trim() || !value.trim()) {
      toast.error("Title and content are required");
      return;
    }

    const formattedTitle = capitalizeTitle(title.trim());
    const formattedContent =
      value.charAt(0).toUpperCase() + value.slice(1).trim();
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user?.token) {
      toast.error("Login required to create or update articles");
      return;
    }

    const config = user?.token
        ? { headers: { Authorization: `Bearer ${user.token}` } }
        : {};

    try {
      if (editingId) {
        await axios.put(
          `/article/update/${editingId}`,
          {
            title: formattedTitle,
            description: formattedContent,
          },
          config
        );
        toast.success("Article updated!");
      } else {
        await axios.post(
          "/article/create",
          {
            title: formattedTitle,
            description: formattedContent,
          },
          config
        );
        toast.success("Article created!");
      }

      setEditingId(null);
      setTitle("");
      setValue("");
      setSearchParams({});
      fetchArticles();
    } catch (error) {
      console.error("Error saving article", error);
      toast.error("Failed to save article");
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this article?");
    if (!confirm) return;

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user?.token) {
      toast.error("Login required to delete article");
      return;
    }
    const config = user?.token
        ? { headers: { Authorization: `Bearer ${user.token}` } }
        : {};

    try {
      await axios.delete(`/article/delete/${id}`,config);
      toast.success("Article deleted!");
      setArticles((prev) => prev.filter((a) => a._id !== id));
    } catch (err) {
      console.error("Delete error", err);
      toast.error("Failed to delete article");
    }
  };

  const formatDate = (date) => {
    try {
      return format(new Date(date), "MMMM dd, yyyy");
    } catch {
      return date;
    }
  };

  const calculateReadTime = (text) => {
    const wordCount = text.trim().split(/\s+/).length;
    return `${Math.max(1, Math.ceil(wordCount / 200))} min read`;
  };

  return (
    <div className="relative w-full min-h-screen grid grid-cols-1 lg:grid-cols-2 gap-0">
      <div className="p-4 md:p-8 lg:p-12">
        <div className="mb-6">
          <h1 className="text-4xl font-extrabold text-gray-900 font-[Supreme]">
            Add Articles
          </h1>
          <p className="text-black mt-3 font-[Supreme]">
            Create and Update your articles here to note informative current affairs
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-xl font-[Supreme] font-semibold mb-2">
              Title
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={title}
                placeholder="Enter your title here"
                className="border font-[Supreme] border-neutral-500 rounded-lg p-3 w-full"
                onChange={(e) => setTitle(e.target.value)}
              />
              <button
                onClick={handleSaveArticle}
                className="px-6 py-2 rounded-lg w-full md:w-60 font-[Supreme] bg-black text-[#F7374F] hover:text-white transition-colors"
              >
                {editingId ? "Update Article" : "Create Article"}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xl font-[Supreme] font-semibold mb-2">
              Description
            </label>
            <textarea
              value={value}
              className="border border-neutral-500 rounded-lg p-4 w-full font-[Supreme] resize-none"
              placeholder="Enter content here"
              rows={14}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>

          {editingId && (
            <div className="flex justify-end">
              <button
                onClick={() => {
                  setEditingId(null);
                  setTitle("");
                  setValue("");
                  setSearchParams({});
                }}
                className="px-4 py-2 rounded-lg font-[Supreme] bg-gray-200 text-gray-700 hover:bg-gray-300"
              >
                Cancel Editing
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="bg-black min-h-screen">
        <div className="p-4 md:p-6 lg:p-8 h-full flex flex-col">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h2 className="text-white font-[Supreme] text-lg font-bold">Watch Your Articles</h2>
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white h-4 w-4" />
              <input
                type="search"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-lg w-full sm:w-64 bg-black text-white border border-white font-[Supreme] focus:outline-none focus:ring-2 focus:ring-[#F7374F]"
              />
            </div>
          </div>

          <div className="flex-grow overflow-y-auto pr-2 custom-scrollbar" style={{ maxHeight: "calc(100vh - 120px)" }}>
            {filteredData.length === 0 ? (
              <div className="flex justify-center items-center h-64 text-white font-[Supreme]">
                {searchTerm ? "No articles match your search" : "No articles yet. Create your first one!"}
              </div>
            ) : (
              <div className="space-y-4 pb-4">
                {filteredData.map((article) => (
                  <div key={article._id} className="bg-black border border-white rounded-lg overflow-hidden">
                    <div className="p-4">
                      <h3 className="font-semibold font-[Supreme] text-white text-lg mb-2">{article.title}</h3>
                      <p className="text-sm font-[Supreme] text-neutral-100 line-clamp-3">
                        {(article.description || article.content)?.split(" ").slice(0, 20).join(" ")}...
                      </p>

                      <div className="flex font-[Supreme] justify-between items-center mt-4 text-xs text-gray-400">
                        <div className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          <span>{formatDate(article.createdAt)}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          <span>{calculateReadTime(article.description || article.content)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap justify-end gap-1 p-3 bg-black">
                      <button
                        onClick={() => {
                          setEditingId(article._id);
                          setTitle(article.title);
                          setValue(article.description || article.content);
                        }}
                        className="flex items-center gap-1 px-2 py-1 rounded-lg bg-black border border-white text-white hover:bg-neutral-300 hover:text-red-600 text-xs font-[Supreme]"
                      >
                        <Edit size={14} />
                        <span>Edit</span>
                      </button>

                      <Link
                        to={`/articles/${article._id}`}
                        className="flex items-center gap-1 px-2 py-1 rounded-lg bg-black border border-white text-white hover:bg-neutral-300 hover:text-red-600 text-xs font-[Supreme]"
                      >
                        <Eye size={14} />
                        <span>View</span>
                      </Link>

                      <button
                        onClick={() => handleDelete(article._id)}
                        className="flex items-center gap-1 px-2 py-1 rounded-lg bg-black border border-white text-white hover:bg-red-600 text-xs font-[Supreme]"
                      >
                        <Trash2 size={14} />
                        <span>Delete</span>
                      </button>

                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(article.description || article.content);
                          toast.success("Copied to clipboard");
                        }}
                        className="flex items-center gap-1 px-2 py-1 rounded-lg bg-black border border-white text-white hover:bg-neutral-300 hover:text-red-600 text-xs font-[Supreme]"
                      >
                        <Copy size={14} />
                        <span>Copy</span>
                      </button>

                      <button
                        onClick={() => {
                          const link = `${window.location.origin}/articles/${article._id}`;
                          navigator.clipboard.writeText(link);
                          toast.success("Shareable link copied!");
                        }}
                        className="flex items-center gap-1 px-2 py-1 rounded-lg bg-black border border-white text-white hover:bg-neutral-300 hover:text-red-600 text-xs font-[Supreme]"
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
  );
};

export default CreateAndUpdateNote;
