import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import api from "../services/api";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);

  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMyNews = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/news/my-news");

        setNews(response.data.data.news);
      } catch (error) {
        console.error("Dashboard news error:", error);

        setError(
          error.response?.data?.message || "Failed to load dashboard data",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMyNews();
  }, []);

  const totalNews = news.length;

  return (
    <div>
      {/* Dashboard Header */}

      <div>
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>

        <p className="mt-2 text-gray-600">
          Welcome back, {user?.name || "User"}!
        </p>
      </div>

      {/* Error */}

      {error && (
        <div className="mt-6 rounded-lg bg-red-100 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Dashboard Cards */}

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Total News */}

        <div className="rounded-xl bg-white p-6 shadow">
          <p className="text-sm font-medium text-gray-500">Total News</p>

          <h2 className="mt-2 text-3xl font-bold text-gray-800">
            {loading ? "..." : totalNews}
          </h2>

          <p className="mt-2 text-sm text-gray-500">Your published news</p>
        </div>

        {/* Published News */}

        <div className="rounded-xl bg-white p-6 shadow">
          <p className="text-sm font-medium text-gray-500">Published</p>

          <h2 className="mt-2 text-3xl font-bold text-green-600">
            {loading ? "..." : totalNews}
          </h2>

          <p className="mt-2 text-sm text-gray-500">Published articles</p>
        </div>

        {/* Account */}

        <div className="rounded-xl bg-white p-6 shadow">
          <p className="text-sm font-medium text-gray-500">Account</p>

          <h2 className="mt-2 text-xl font-bold text-blue-600">Active</h2>

          <p className="mt-2 text-sm text-gray-500">Your account is active</p>
        </div>
      </div>

      {/* Recent News */}

      <div className="mt-8 rounded-xl bg-white p-6 shadow">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Recent News</h2>

            <p className="mt-1 text-sm text-gray-500">
              Your recently published articles
            </p>
          </div>

          <Link
            to="/dashboard/my-news"
            className="font-semibold text-blue-600 hover:underline">
            View All →
          </Link>
        </div>

        {loading && <p className="mt-6 text-gray-500">Loading your news...</p>}

        {!loading && !error && news.length === 0 && (
          <div className="mt-6 rounded-lg bg-gray-50 p-6 text-center">
            <p className="text-gray-600">You haven't published any news yet.</p>

            <Link
              to="/dashboard/create-news"
              className="mt-4 inline-block rounded-lg bg-blue-600 px-5 py-2.5 font-semibold text-white hover:bg-blue-700">
              Create Your First News
            </Link>
          </div>
        )}

        {!loading && news.length > 0 && (
          <div className="mt-6 space-y-4">
            {news.slice(0, 3).map((item) => (
              <div
                key={item._id}
                className="flex flex-col gap-4 rounded-lg border border-gray-200 p-4 sm:flex-row">
                {/* Image */}

                {item.image && (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-24 w-full rounded-lg object-cover sm:w-32"
                  />
                )}

                {/* News Information */}

                <div className="flex-1">
                  <span className="text-sm font-semibold text-blue-600">
                    {item.category}
                  </span>

                  <h3 className="mt-1 line-clamp-2 font-bold text-gray-800">
                    {item.title}
                  </h3>

                  <p className="mt-1 line-clamp-2 text-sm text-gray-600">
                    {item.description}
                  </p>

                  <p className="mt-2 text-xs text-gray-500">
                    Published {new Date(item.createdAt).toLocaleDateString()}
                  </p>
                </div>

                {/* View Button */}

                <div className="flex items-center">
                  <Link
                    to={`/news/${item._id}`}
                    className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-200">
                    View
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* User Information */}

      <div className="mt-8 rounded-xl bg-white p-6 shadow">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          {/* Profile Image */}

          {user?.profileImage ? (
            <img
              src={user.profileImage}
              alt={user.name}
              className="h-20 w-20 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-2xl font-bold text-blue-600">
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </div>
          )}

          <div>
            <h2 className="text-xl font-bold text-gray-800">
              Account Information
            </h2>

            <p className="mt-1 text-gray-500">Your account details</p>
          </div>
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <div className="rounded-lg bg-gray-50 p-4">
            <p className="text-sm text-gray-500">Name</p>

            <p className="mt-1 font-semibold text-gray-800">
              {user?.name || "Not available"}
            </p>
          </div>

          <div className="rounded-lg bg-gray-50 p-4">
            <p className="text-sm text-gray-500">Email</p>

            <p className="mt-1 break-all font-semibold text-gray-800">
              {user?.email || "Not available"}
            </p>
          </div>
        </div>

        <Link
          to="/dashboard/profile"
          className="mt-5 inline-block rounded-lg bg-blue-600 px-5 py-2.5 font-semibold text-white hover:bg-blue-700">
          Edit Profile
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
