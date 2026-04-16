const express = require("express");
const router = express.Router();
const { getPaymentsByEmail } = require("../controllers/paymentsController");

// Getting payments by email Route
router.get("/get/payments", getPaymentsByEmail);

module.exports = router;
