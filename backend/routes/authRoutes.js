const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserData,
} = require("../controllers/authController");
const { authenticateToken } = require("../middleware/authMiddleware");

// User Registration Route
router.post("/add/users", registerUser);

// User Login Route
router.post("/login", loginUser);

// Sending Email
router.post("/Email", loginUser);

// Get User Data from Token Route (Protected)
router.get("/userData", authenticateToken, getUserData);

module.exports = router;
