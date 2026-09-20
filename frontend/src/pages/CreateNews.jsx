import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";

const CreateNews = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    category: "",
    image: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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
    setSuccess("");

    try {
      setLoading(true);

      const response = await api.post("/news", formData);

      console.log("Create news response:", response.data);

      setSuccess("News published successfully!");

      setFormData({
        title: "",
        description: "",
        content: "",
        category: "",
        image: "",
      });

      setTimeout(() => {
        navigate("/news");
      }, 1000);
    } catch (error) {
      console.error("Create news error:", error);

      setError(error.response?.data?.message || "Failed to publish news");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Create News</h1>

        <p className="mt-2 text-gray-600">Publish a new news article</p>
      </div>

      {/* Form Container */}
      <div className="mt-8 rounded-xl bg-white p-6 shadow">
        {/* Error Message */}
        {error && (
          <div className="mb-6 rounded-lg bg-red-100 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="mb-6 rounded-lg bg-green-100 px-4 py-3 text-sm text-green-700">
            {success}
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
              placeholder="Enter news title"
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

          {/* Image URL */}
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

            <p className="mt-2 text-sm text-gray-500">
              Add an image URL for your news article.
            </p>
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
              placeholder="Write a short description of the news"
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
              placeholder="Write the full news article here"
              rows="10"
              className="w-full resize-y rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4">
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400">
              {loading ? "Publishing..." : "Publish News"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-100">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateNews;
