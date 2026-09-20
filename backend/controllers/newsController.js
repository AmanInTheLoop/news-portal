const News = require("../models/News");

// Create News
const createNews = async (req, res) => {
  try {
    const { title, description, content, category, image } = req.body;

    if (!title || !description || !content || !category) {
      return res.status(400).json({
        success: false,
        message: "Title, description, content and category are required",
      });
    }

    const news = await News.create({
      title,
      description,
      content,
      image,
      category,
      author: req.user.userId,
    });

    res.status(201).json({
      success: true,
      message: "News created successfully",
      data: {
        news,
      },
    });
  } catch (error) {
    console.error("Create news error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Get All News
const getAllNews = async (req, res) => {
  try {
    const news = await News.find()
      .populate("author", "name email profileImage")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: {
        news,
      },
    });
  } catch (error) {
    console.error("Get all news error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Get Single News
const getNewsById = async (req, res) => {
  try {
    const news = await News.findById(req.params.id).populate(
      "author",
      "name email profileImage",
    );

    if (!news) {
      return res.status(404).json({
        success: false,
        message: "News not found",
      });
    }

    res.status(200).json({
      success: true,
      data: {
        news,
      },
    });
  } catch (error) {
    console.error("Get news by ID error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Get Logged-in User's News
const getMyNews = async (req, res) => {
  try {
    const news = await News.find({
      author: req.user.userId,
    })
      .populate("author", "name email profileImage")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: {
        news,
      },
    });
  } catch (error) {
    console.error("Get my news error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Update News
const updateNews = async (req, res) => {
  try {
    const { title, description, content, category, image } = req.body;

    const news = await News.findById(req.params.id);

    if (!news) {
      return res.status(404).json({
        success: false,
        message: "News not found",
      });
    }

    // Check ownership
    if (news.author.toString() !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to edit this news",
      });
    }

    if (!title || !description || !content || !category) {
      return res.status(400).json({
        success: false,
        message: "Title, description, content and category are required",
      });
    }

    news.title = title;
    news.description = description;
    news.content = content;
    news.category = category;
    news.image = image || "";

    await news.save();

    const updatedNews = await News.findById(news._id).populate(
      "author",
      "name email profileImage",
    );

    res.status(200).json({
      success: true,
      message: "News updated successfully",
      data: {
        news: updatedNews,
      },
    });
  } catch (error) {
    console.error("Update news error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Delete News
const deleteNews = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);

    if (!news) {
      return res.status(404).json({
        success: false,
        message: "News not found",
      });
    }

    // Check ownership
    if (news.author.toString() !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to delete this news",
      });
    }

    await News.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "News deleted successfully",
    });
  } catch (error) {
    console.error("Delete news error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = {
  createNews,
  getAllNews,
  getNewsById,
  getMyNews,
  updateNews,
  deleteNews,
};
