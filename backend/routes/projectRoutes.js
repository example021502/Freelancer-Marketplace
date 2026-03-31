const express = require("express");
const router = express.Router();
const {
  getAllProjects,
  getUserProjects,
} = require("../controllers/projectController");

// Fetching all projects Route
router.get("/get/projects", getAllProjects);
router.get("/get/user_projects", getUserProjects);

module.exports = router;
