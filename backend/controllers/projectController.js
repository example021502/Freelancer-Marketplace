const pool = require("../config/db");

// Fetching all projects Controller
const getAllProjects = async (req, res) => {
  try {
    const sql = `SELECT f.rating, p.project_id, p.user_id, p.freelancer_id, p.title, p.description, p.budget_min, p.budget_max, p.project_type, i.alt_text, i.image_url FROM freelancer_profiles f LEFT JOIN projects p ON f.freelancer_id = p.freelancer_id LEFT JOIN images i ON p.project_id = i.project_id WHERE p.visibility = "public"`;
    const [result] = await pool.query(sql);
    return res.status(200).send(result);
  } catch (error) {
    console.error("Database error:", error);
    return res
      .status(500)
      .json({ message: "Database error", error: error.message });
  }
};

// getting specific user projects using email and role
const getUserProjects = async (req, res) => {
  const { email, role } = req.query;

  try {
    // Get user_id from email and role
    const [userRows] = await pool.query(
      "SELECT user_id FROM users WHERE email=? AND role=?",
      [email, role],
    );

    if (!userRows || userRows.length === 0)
      return res.status(404).json({ message: "User not found!" });

    const user_id = userRows[0].user_id;

    // Get all projects for this user
    const [projects] = await pool.query(
      "SELECT * FROM projects WHERE user_id=?",
      [user_id],
    );

    if (!projects || projects.length === 0)
      return res.status(404).json({ message: "No Projects found!" });

    // Get related images, ratings, and payments in parallel
    const [imagesResult, ratingsResult, paymentsResult] = await Promise.all([
      pool.query(
        "SELECT p.project_id, p.user_id, i.image_id, i.alt_text, i.image_url FROM projects p LEFT JOIN images i ON p.project_id = i.project_id WHERE p.user_id = ?",
        [user_id],
      ),
      pool.query(
        "SELECT p.project_id, p.user_id, r.rate_id, r.freelancer_id, r.reviewer_id, r.reviwee_id, r.rating, r.rating_comment, r.created_at FROM projects p LEFT JOIN ratings r ON p.project_id = r.project_id WHERE p.user_id = ?",
        [user_id],
      ),
      pool.query(
        "SELECT p.project_id, p.user_id, b.payment_id, b.freelancer_id, b.amount, b.payment_status, b.payment_method, b.created_at FROM projects p LEFT JOIN payments b ON p.project_id = b.project_id WHERE p.user_id = ?",
        [user_id],
      ),
    ]);

    return res.status(200).json({
      result: {
        projects: projects,
        images: imagesResult[0],
        ratings: ratingsResult[0],
        payments: paymentsResult[0],
      },
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
