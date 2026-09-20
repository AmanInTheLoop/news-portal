import { Link } from "react-router-dom";

const NewsCard = ({ news }) => {
  return (
    <article className="overflow-hidden rounded-xl bg-white shadow-md">
      {news.image && (
        <img
          src={news.image}
          alt={news.title}
          className="h-48 w-full object-cover"
        />
      )}

      <div className="p-5">
        <span className="text-sm font-semibold text-blue-600">
          {news.category}
        </span>

        <h2 className="mt-2 text-xl font-bold text-gray-800">{news.title}</h2>

        <p className="mt-2 line-clamp-3 text-gray-600">{news.description}</p>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm text-gray-500">
            By {news.author?.name || "Unknown"}
          </span>

          <Link
            to={`/news/${news._id}`}
            className="font-semibold text-blue-600 hover:underline">
            Read More
          </Link>
        </div>
      </div>
    </article>
  );
};

export default NewsCard;
