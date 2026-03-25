const express = require("express");
const router = express.Router();
const { getAllUsers } = require("../controllers/userController");

// Fetching all users Route
router.get("/get/users", getAllUsers);

module.exports = router;
