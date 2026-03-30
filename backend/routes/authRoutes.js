const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserData,
  sendOTPEmail,
} = require("../controllers/authController");
const { authenticateToken } = require("../middleware/authMiddleware");
const userProjects = require("../controllers/getUserProjects");

// User Registration Route
router.post("/add/users", registerUser);

// User Login Route
router.post("/login", loginUser);

// Sending Email
router.post("/Email", sendOTPEmail);

// get all logged in user_projects
router.post("/get/projects", userProjects);

// Get User Data from Token Route (Protected)
router.get("/userData", authenticateToken, getUserData);

module.exports = router;
