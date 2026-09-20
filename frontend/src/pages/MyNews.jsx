import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../services/api";

const MyNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    const fetchMyNews = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/news/my-news");

        setNews(response.data.data.news);
      } catch (error) {
        console.error("My news error:", error);

        setError(error.response?.data?.message || "Failed to load your news");
      } finally {
        setLoading(false);
      }
    };

    fetchMyNews();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this news?",
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(id);

      await api.delete(`/news/${id}`);

      setNews((currentNews) => currentNews.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Delete news error:", error);

      setError(error.response?.data?.message || "Failed to delete news");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div>
        <h1 className="text-3xl font-bold text-gray-800">My News</h1>

        <p className="mt-6 text-gray-600">Loading your news...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">My News</h1>

          <p className="mt-2 text-gray-600">
            Manage the news articles you have published.
          </p>
        </div>

        <Link
          to="/dashboard/create-news"
          className="rounded-lg bg-blue-600 px-5 py-3 text-center font-semibold text-white hover:bg-blue-700">
          + Create News
        </Link>
      </div>

      {/* Error */}
      {error && (
        <div className="mt-6 rounded-lg bg-red-100 px-4 py-3 text-red-700">
          {error}
        </div>
      )}

      {/* Empty */}
      {!error && news.length === 0 && (
        <div className="mt-8 rounded-xl bg-white p-8 text-center shadow">
          <h2 className="text-xl font-semibold text-gray-800">
            You haven't published any news yet.
          </h2>

          <p className="mt-2 text-gray-500">Create your first news article.</p>

          <Link
            to="/dashboard/create-news"
            className="mt-5 inline-block rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700">
            Create News
          </Link>
        </div>
      )}

      {/* News List */}
      {!error && news.length > 0 && (
        <div className="mt-8 space-y-5">
          {news.map((item) => (
            <div key={item._id} className="rounded-xl bg-white p-5 shadow">
              <div className="flex flex-col gap-5 md:flex-row">
                {/* Image */}
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-40 w-full rounded-lg object-cover md:w-56"
                  />
                )}

                {/* Content */}
                <div className="flex-1">
                  <span className="text-sm font-semibold text-blue-600">
                    {item.category}
                  </span>

                  <h2 className="mt-2 text-xl font-bold text-gray-800">
                    {item.title}
                  </h2>

                  <p className="mt-2 line-clamp-2 text-gray-600">
                    {item.description}
                  </p>

                  <p className="mt-3 text-sm text-gray-500">
                    Published: {new Date(item.createdAt).toLocaleDateString()}
                  </p>

                  {/* Buttons */}
                  <div className="mt-4 flex flex-wrap gap-3">
                    <Link
                      to={`/news/${item._id}`}
                      className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200">
                      View
                    </Link>

                    <Link
                      to={`/dashboard/edit-news/${item._id}`}
                      className="rounded-lg bg-yellow-500 px-4 py-2 text-sm font-medium text-white hover:bg-yellow-600">
                      Edit
                    </Link>

                    <button
                      type="button"
                      onClick={() => handleDelete(item._id)}
                      disabled={deletingId === item._id}
                      className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 disabled:cursor-not-allowed disabled:bg-red-300">
                      {deletingId === item._id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyNews;
