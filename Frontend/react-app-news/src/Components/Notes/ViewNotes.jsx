import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";
import { Clock, Calendar } from "lucide-react";

const ViewNotes = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      const user = JSON.parse(localStorage.getItem("user"));

      if (user?.token) {
        try {
          const res = await axios.get(`/notes/single/${id}`, {
            headers: { Authorization: `Bearer ${user.token}` },
          });
          setArticle(res.data.article);
        } catch (err) {
          console.error("Error fetching article from MongoDB", err);
        }
      } else {
        const localArticles = JSON.parse(localStorage.getItem("articles")) || [];
        const localArticle = localArticles.find((a) => a._id === id);
        setArticle(localArticle);
      }
    };

    fetchArticle();
  }, [id]);

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), "MMMM dd, yyyy");
    } catch {
      return dateString;
    }
  };

  const calculateReadTime = (text) => {
    const wordCount = text?.trim().split(/\s+/).length || 0;
    return `${Math.max(1, Math.ceil(wordCount / 200))} min read`;
  };

  if (!article) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500 text-lg font-[Supreme]">Article not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <div className="max-w-3xl w-full bg-white p-6 rounded-lg shadow-md">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-700 hover:text-red-500 font-semibold font-[Supreme]"
        >
          &larr; Back
        </button>

        <h1 className="text-3xl font-bold text-[#F7374F] mt-4 font-[Supreme]">
          {article.title}
        </h1>

        <div className="flex items-center text-gray-500 text-sm mt-3">
          <div className="flex items-center mr-4">
            <Calendar className="w-4 h-4 mr-1" />
            <span className="font-[Supreme]">
              {formatDate(article.createdAT || article.createdAt)}
            </span>
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            <span className="font-[Supreme]">
              {calculateReadTime(article.content || article.description)}
            </span>
          </div>
        </div>

        <p className="mt-6 text-black leading-relaxed font-[Supreme]">
          {article.content || article.description}
        </p>
      </div>
    </div>
  );
};

export default ViewNotes;
