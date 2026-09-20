const express = require("express");

const {
  createNews,
  getAllNews,
  getNewsById,
  getMyNews,
  updateNews,
  deleteNews,
} = require("../controllers/newsController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Get all news
router.get("/", getAllNews);

// Get logged-in user's news
router.get("/my-news", protect, getMyNews);

// Get single news
router.get("/:id", getNewsById);

// Create news
router.post("/", protect, createNews);

// Update news
router.put("/:id", protect, updateNews);

// Delete news
router.delete("/:id", protect, deleteNews);

module.exports = router;
