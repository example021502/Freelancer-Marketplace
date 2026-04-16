const pool = require("../config/db");

// Fetching all public projects Controller
const getAllProjects = async (req, res) => {
  try {
    const sql = `SELECT * FROM projects WHERE visibility = ?`;
    const [projects] = await pool.query(sql, ["public"]);
    if (!projects[0] || projects[0].length === 0)
      return res.status(400).json({ message: "No projects" });

    return res.status(200).json({ result: projects });
  } catch (error) {
    console.error("Database error:", error);
    return res.status(500).json({ message: "Database Error!" });
  }
};

// getting specific user projects using email
const getUserProjects = async (req, res) => {
  const { email, role } = req.query;
  const sql =
    role === "client"
      ? "SELECT c.client_id, p.* FROM clients c LEFT JOIN projects p ON c.client_id = p.client_id WHERE c.email = ?"
      : "SELECT f.freelancer_id, p.* FROM freelancers f LEFT JOIN projects p ON f.freelancer_id = p.freelancer_id WHERE f.email = ?";

  try {
    // Get related projects, images, ratings, and payments in parallel
    const [projects] = await pool.query(sql, [email]);

    return res.status(200).json({
      result: projects,
    });
  } catch (error) {
    console.error("Database error:", error);
    return res
      .status(500)
      .json({ message: "Database Error!", error: error.message });
  }
};

module.exports = {
  getAllProjects,
  getUserProjects,
};
