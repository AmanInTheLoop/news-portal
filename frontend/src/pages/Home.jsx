import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import api from "../services/api";

import { setNews, setLoading, setError } from "../store/slices/newsSlice";

import NewsCard from "../components/NewsCard";

const Home = () => {
  const dispatch = useDispatch();

  const { news, loading, error } = useSelector((state) => state.news);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        dispatch(setLoading(true));
        dispatch(setError(null));

        const response = await api.get("/news");

        dispatch(setNews(response.data.data.news));
      } catch (error) {
        console.error("Home news error:", error);

        dispatch(
          setError(error.response?.data?.message || "Failed to load news"),
        );
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchNews();
  }, [dispatch]);

  const topNews = news.slice(0, 6);

  const technologyNews = news
    .filter((item) => item.category === "Technology")
    .slice(0, 3);

  const businessNews = news
    .filter((item) => item.category === "Business")
    .slice(0, 3);

  const sportsNews = news
    .filter((item) => item.category === "Sports")
    .slice(0, 3);

  const entertainmentNews = news
    .filter((item) => item.category === "Entertainment")
    .slice(0, 3);

  return (
    <div className="bg-gray-50">
      {/* ================================
          SECTION 1: HERO
      ================================= */}

      <section className="bg-gray-900 px-6 py-16 text-white">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <span className="inline-block rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold">
                Latest Updates
              </span>

              <h1 className="mt-5 text-4xl font-bold leading-tight md:text-5xl">
                Stay Updated With
                <span className="text-blue-500"> The Latest News</span>
              </h1>

              <p className="mt-5 max-w-xl text-lg leading-8 text-gray-300">
                Get the latest news, stories and updates from around the world.
                Discover important events across technology, business, sports
                and entertainment.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/news"
                  className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700">
                  Explore All News
                </Link>

                <Link
                  to="/contact"
                  className="rounded-lg border border-gray-600 px-6 py-3 font-semibold text-white transition hover:bg-gray-800">
                  Contact Us
                </Link>
              </div>
            </div>

            <div className="rounded-2xl bg-gray-800 p-8">
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-400">
                NewsPortal
              </p>

              <h2 className="mt-4 text-3xl font-bold">
                News that keeps you informed
              </h2>

              <p className="mt-4 leading-7 text-gray-300">
                Read stories from different categories and stay informed about
                the topics that matter to you.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="rounded-lg bg-gray-700 p-4">
                  <p className="text-2xl font-bold">{news.length}</p>

                  <p className="mt-1 text-sm text-gray-300">News Articles</p>
                </div>

                <div className="rounded-lg bg-gray-700 p-4">
                  <p className="text-2xl font-bold">8+</p>

                  <p className="mt-1 text-sm text-gray-300">Categories</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================
          SECTION 2: TOP 6 NEWS
      ================================= */}

      <section className="px-6 py-14">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="font-semibold text-blue-600">TOP STORIES</p>

              <h2 className="mt-2 text-3xl font-bold text-gray-800">
                Latest News
              </h2>

              <p className="mt-2 text-gray-600">
                Discover the latest stories and important updates.
              </p>
            </div>

            <Link
              to="/news"
              className="font-semibold text-blue-600 hover:underline">
              View All News →
            </Link>
          </div>

          {loading && (
            <div className="mt-8 rounded-xl bg-white p-8 text-center shadow">
              <p className="text-gray-600">Loading latest news...</p>
            </div>
          )}

          {error && (
            <div className="mt-8 rounded-xl bg-red-50 p-6 text-red-600">
              {error}
            </div>
          )}

          {!loading && !error && topNews.length === 0 && (
            <div className="mt-8 rounded-xl bg-white p-8 text-center shadow">
              <p className="text-gray-600">No news available yet.</p>
            </div>
          )}

          {!loading && !error && topNews.length > 0 && (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {topNews.map((item) => (
                <NewsCard key={item._id} news={item} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ================================
          SECTION 3: TECHNOLOGY & BUSINESS
      ================================= */}

      <section className="bg-white px-6 py-14">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Technology */}

            <div>
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-blue-600">
                    CATEGORY
                  </p>

                  <h2 className="mt-1 text-2xl font-bold text-gray-800">
                    Technology
                  </h2>
                </div>

                <Link
                  to="/news"
                  className="text-sm font-semibold text-blue-600 hover:underline">
                  See More
                </Link>
              </div>

              {technologyNews.length > 0 ? (
                <div className="space-y-5">
                  {technologyNews.map((item) => (
                    <Link
                      key={item._id}
                      to={`/news/${item._id}`}
                      className="flex gap-4 rounded-xl border border-gray-200 bg-gray-50 p-4 transition hover:shadow-md">
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-24 w-28 rounded-lg object-cover"
                        />
                      )}

                      <div className="flex-1">
                        <span className="text-xs font-semibold text-blue-600">
                          Technology
                        </span>

                        <h3 className="mt-1 line-clamp-2 font-bold text-gray-800">
                          {item.title}
                        </h3>

                        <p className="mt-1 line-clamp-2 text-sm text-gray-600">
                          {item.description}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="rounded-xl bg-gray-50 p-6 text-gray-500">
                  No technology news available.
                </div>
              )}
            </div>

            {/* Business */}

            <div>
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-green-600">
                    CATEGORY
                  </p>

                  <h2 className="mt-1 text-2xl font-bold text-gray-800">
                    Business
                  </h2>
                </div>

                <Link
                  to="/news"
                  className="text-sm font-semibold text-blue-600 hover:underline">
                  See More
                </Link>
              </div>

              {businessNews.length > 0 ? (
                <div className="space-y-5">
                  {businessNews.map((item) => (
                    <Link
                      key={item._id}
                      to={`/news/${item._id}`}
                      className="flex gap-4 rounded-xl border border-gray-200 bg-gray-50 p-4 transition hover:shadow-md">
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-24 w-28 rounded-lg object-cover"
                        />
                      )}

                      <div className="flex-1">
                        <span className="text-xs font-semibold text-green-600">
                          Business
                        </span>

                        <h3 className="mt-1 line-clamp-2 font-bold text-gray-800">
                          {item.title}
                        </h3>

                        <p className="mt-1 line-clamp-2 text-sm text-gray-600">
                          {item.description}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="rounded-xl bg-gray-50 p-6 text-gray-500">
                  No business news available.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ================================
          SECTION 4: SPORTS & ENTERTAINMENT
      ================================= */}

      <section className="px-6 py-14">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10">
            <p className="font-semibold text-blue-600">MORE STORIES</p>

            <h2 className="mt-2 text-3xl font-bold text-gray-800">
              Explore More Categories
            </h2>
          </div>

          <div className="grid gap-10 lg:grid-cols-2">
            {/* Sports */}

            <div className="rounded-2xl bg-white p-6 shadow">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800">Sports</h2>

                <Link
                  to="/news"
                  className="text-sm font-semibold text-blue-600 hover:underline">
                  View More
                </Link>
              </div>

              {sportsNews.length > 0 ? (
                <div className="mt-6 space-y-5">
                  {sportsNews.map((item) => (
                    <Link
                      key={item._id}
                      to={`/news/${item._id}`}
                      className="block border-b border-gray-200 pb-5 last:border-b-0">
                      <span className="text-sm font-semibold text-orange-600">
                        Sports
                      </span>

                      <h3 className="mt-1 text-lg font-bold text-gray-800 hover:text-blue-600">
                        {item.title}
                      </h3>

                      <p className="mt-1 line-clamp-2 text-sm text-gray-600">
                        {item.description}
                      </p>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="mt-6 text-gray-500">No sports news available.</p>
              )}
            </div>

            {/* Entertainment */}

            <div className="rounded-2xl bg-white p-6 shadow">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800">
                  Entertainment
                </h2>

                <Link
                  to="/news"
                  className="text-sm font-semibold text-blue-600 hover:underline">
                  View More
                </Link>
              </div>

              {entertainmentNews.length > 0 ? (
                <div className="mt-6 space-y-5">
                  {entertainmentNews.map((item) => (
                    <Link
                      key={item._id}
                      to={`/news/${item._id}`}
                      className="block border-b border-gray-200 pb-5 last:border-b-0">
                      <span className="text-sm font-semibold text-purple-600">
                        Entertainment
                      </span>

                      <h3 className="mt-1 text-lg font-bold text-gray-800 hover:text-blue-600">
                        {item.title}
                      </h3>

                      <p className="mt-1 line-clamp-2 text-sm text-gray-600">
                        {item.description}
                      </p>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="mt-6 text-gray-500">
                  No entertainment news available.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ================================
          SECTION 5: CTA
      ================================= */}

      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl rounded-2xl bg-blue-600 px-6 py-12 text-center text-white">
          <h2 className="text-3xl font-bold md:text-4xl">
            Have a Story to Share?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-blue-100">
            Create an account and publish your own news articles on NewsPortal.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/register"
              className="rounded-lg bg-white px-6 py-3 font-semibold text-blue-600 hover:bg-gray-100">
              Create Account
            </Link>

            <Link
              to="/dashboard/create-news"
              className="rounded-lg border border-white px-6 py-3 font-semibold text-white hover:bg-blue-700">
              Publish News
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
