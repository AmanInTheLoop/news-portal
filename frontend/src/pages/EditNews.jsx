import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../services/api";

const EditNews = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    category: "",
    image: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get(`/news/${id}`);

        const news = response.data.data.news;

        setFormData({
          title: news.title || "",
          description: news.description || "",
          content: news.content || "",
          category: news.category || "",
          image: news.image || "",
        });
      } catch (error) {
        console.error("Fetch news error:", error);

        setError(error.response?.data?.message || "Failed to load news");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    try {
      setSaving(true);

      await api.put(`/news/${id}`, formData);

      navigate("/dashboard/my-news");
    } catch (error) {
      console.error("Update news error:", error);

      setError(error.response?.data?.message || "Failed to update news");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Edit News</h1>

        <p className="mt-6 text-gray-600">Loading news...</p>
      </div>
    );
  }

  if (error && !formData.title) {
    return (
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Edit News</h1>

        <div className="mt-6 rounded-lg bg-red-100 px-4 py-3 text-red-700">
          {error}
        </div>

        <button
          onClick={() => navigate("/dashboard/my-news")}
          className="mt-5 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700">
          Back to My News
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Edit News</h1>

        <p className="mt-2 text-gray-600">Update your news article</p>
      </div>

      {/* Form */}
      <div className="mt-8 rounded-xl bg-white p-6 shadow">
        {error && (
          <div className="mb-6 rounded-lg bg-red-100 px-4 py-3 text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="mb-2 block font-medium text-gray-700">
              News Title
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Category
            </label>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
              required>
              <option value="">Select a category</option>

              <option value="Politics">Politics</option>

              <option value="Technology">Technology</option>

              <option value="Sports">Sports</option>

              <option value="Business">Business</option>

              <option value="Entertainment">Entertainment</option>

              <option value="Health">Health</option>

              <option value="Education">Education</option>

              <option value="International">International</option>
            </select>
          </div>

          {/* Image */}
          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Image URL
            </label>

            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Short Description
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
              required
            />
          </div>

          {/* Content */}
          <div>
            <label className="mb-2 block font-medium text-gray-700">
              News Content
            </label>

            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows="10"
              className="w-full resize-y rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4">
            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400">
              {saving ? "Updating..." : "Update News"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/dashboard/my-news")}
              className="rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 hover:bg-gray-100">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditNews;
