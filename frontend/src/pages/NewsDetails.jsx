import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import api from "../services/api";

const NewsDetails = () => {
  const { id } = useParams();

  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);

        const response = await api.get(`/news/${id}`);

        setNews(response.data.data.news);
      } catch (error) {
        console.error("News details error:", error);

        setError(error.response?.data?.message || "Failed to load news");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [id]);

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-10">
        <p>Loading news...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-10">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (!news) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-10">
        <p>News not found.</p>
      </div>
    );
  }

  return (
    <article className="bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-4xl rounded-xl bg-white p-6 shadow-md">
        {news.image && (
          <img
            src={news.image}
            alt={news.title}
            className="mb-6 h-96 w-full rounded-xl object-cover"
          />
        )}

        <span className="font-semibold text-blue-600">{news.category}</span>

        <h1 className="mt-3 text-4xl font-bold text-gray-900">{news.title}</h1>

        <div className="mt-4 text-sm text-gray-500">
          By {news.author?.name || "Unknown"}
        </div>

        <p className="mt-6 text-lg font-medium leading-8 text-gray-700">
          {news.description}
        </p>

        <div className="mt-6 whitespace-pre-line leading-8 text-gray-700">
          {news.content}
        </div>
      </div>
    </article>
  );
};

export default NewsDetails;
