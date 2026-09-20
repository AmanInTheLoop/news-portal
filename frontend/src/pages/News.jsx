import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import api from "../services/api";

import { setNews, setLoading, setError } from "../store/slices/newsSlice";

import NewsCard from "../components/NewsCard";
import CategoryFilter from "../components/CategoryFilter";

const News = () => {
  const dispatch = useDispatch();

  const { news, loading, error } = useSelector((state) => state.news);

  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchNews = async () => {
      try {
        dispatch(setLoading(true));
        dispatch(setError(null));

        const response = await api.get("/news");

        dispatch(setNews(response.data.data.news));
      } catch (error) {
        console.error("News API error:", error);

        dispatch(
          setError(error.response?.data?.message || "Failed to load news"),
        );
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchNews();
  }, [dispatch]);

  const categories = ["All", ...new Set(news.map((item) => item.category))];

  const filteredNews =
    selectedCategory === "All"
      ? news
      : news.filter((item) => item.category === selectedCategory);

  return (
    <div className="bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-3xl font-bold text-gray-800">All News</h1>

        <p className="mt-2 text-gray-600">Browse the latest news and updates</p>

        {loading && <p className="mt-8 text-gray-600">Loading news...</p>}

        {error && <p className="mt-8 text-red-600">{error}</p>}

        {!loading && !error && news.length > 0 && (
          <>
            <div className="mt-8">
              <CategoryFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />
            </div>

            {filteredNews.length === 0 ? (
              <p className="text-gray-600">No news found in this category.</p>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredNews.map((item) => (
                  <NewsCard key={item._id} news={item} />
                ))}
              </div>
            )}
          </>
        )}

        {!loading && !error && news.length === 0 && (
          <p className="mt-8 text-gray-600">No news available.</p>
        )}
      </div>
    </div>
  );
};

export default News;
