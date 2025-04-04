import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import { Clock, Calendar } from "lucide-react";

const ViewNotes = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const article = useSelector((state) =>
    state.article.articles.find((article) => article._id === id)
  );

  if (!article) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500 text-lg">Article not found</p>
      </div>
    );
  }

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), "MMMM dd, yyyy");
    } catch (error) {
      return dateString;
    }
  };

  const calculateReadTime = (text) => {
    const wordCount = text.trim().split(/\s+/).length;
    const readTime = Math.max(1, Math.ceil(wordCount / 200));
    return `${readTime} min read`;
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <div className="max-w-3xl w-full bg-white p-6 rounded-lg shadow-md">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-700 hover:text-red-500 font-semibold font-[Supreme]"
        >
          &larr; Back
        </button>
        
        <h1 className="text-3xl font-bold text-[#F7374F] mt-4 font-[Supreme]">{article.title}</h1>
        
        <div className="flex items-center text-gray-500 text-sm mt-3">
          <div className="flex items-center mr-4">
            <Calendar className="w-4 h-4 mr-1" />
            <span className="font-[Supreme]">{formatDate(article.createdAT)}</span>
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            <span className="font-[Supreme]">{calculateReadTime(article.content)}</span>
          </div>
        </div>
        
        <p className="mt-6 text-black leading-relaxed font-[Supreme]">{article.content}</p>
      </div>
    </div>
  );
};

export default ViewNotes;
