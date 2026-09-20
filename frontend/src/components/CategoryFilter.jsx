const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <div className="mb-8 flex flex-wrap gap-3">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`rounded-lg px-4 py-2 font-medium ${
            selectedCategory === category
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-700 shadow hover:bg-gray-100"
          }`}>
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
