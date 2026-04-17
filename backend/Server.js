/**
 * Freelancer Marketplace Backend Server
 *
 * This is the main server file that sets up the Express application,
 * configures middleware, and mounts all the modularized routes.
 *
 * Modularization Structure:
 * - Controllers: Handle business logic for each route
 * - Routes: Define HTTP endpoints and route them to controllers
 * - Middleware: Handle authentication and other cross-cutting concerns
 */

const express = require("express");
const cors = require("cors");

// Import modularized routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const projectRoutes = require("./routes/projectRoutes");
const commonRoutes = require("./routes/commonRoutes");
const paymentsRoutes = require("./routes/paymentRoutes");
const postsRoutes = require("./routes/postsRoutes");

const app = express();
const port = 8080;

// Middleware Setup
app.use(cors());
app.use(express.json());

// Mount Routes with API prefix
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", projectRoutes);
app.use("/api", commonRoutes);
app.use("/api", paymentsRoutes);
app.use("/api", postsRoutes);

// Server Start
app.listen(port, "0.0.0.0", () => {
  console.log(`app listening at port ${port}`);
});

module.exports = app;
