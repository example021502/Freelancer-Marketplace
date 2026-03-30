const express = require("express");
const router = express.Router();
const { getAllProjects } = require("../controllers/projectController");
const userProjects = require("../controllers/getUserProjects");

// Fetching all projects Route
router.get("/get/projects", getAllProjects);
router.get("/get/user_projects/:email", userProjects);

module.exports = router;
