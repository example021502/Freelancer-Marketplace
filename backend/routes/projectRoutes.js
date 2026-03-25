const express = require("express");
const router = express.Router();
const { getAllProjects } = require("../controllers/projectController");

// Fetching all projects Route
router.get("/get/projects", getAllProjects);

module.exports = router;
