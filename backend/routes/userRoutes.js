const express = require("express");

const { getProfile, updateProfile } = require("../controllers/userController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Get profile
router.get("/profile", protect, getProfile);

// Update profile
router.put("/profile", protect, updateProfile);

module.exports = router;
