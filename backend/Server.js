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

// Server Start
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log("  POST /api/add/users - User registration");
  console.log("  POST /api/login - User login");
  console.log("  GET  /api/userData - Get user data (protected)");
  console.log("  GET  /api/get/users - Get all users");
  console.log("  GET  /api/get/projects - Get all projects");
  console.log("  GET  /api/get/:table/:id - Get specific data from any table");
  console.log(
    "GET /api/get/user_projects/:email -Get logged user projects information",
  );
});

module.exports = app;
