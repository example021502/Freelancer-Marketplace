const express = require("express");
const router = express.Router();
const { getSpecificData } = require("../controllers/commonController");

// Getting specific user or data from any table Route
router.get(
  "/get/data/:table_name/:target_field/:target_value",
  getSpecificData,
);

module.exports = router;
