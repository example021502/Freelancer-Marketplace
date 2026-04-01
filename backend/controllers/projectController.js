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
    // Get related projects, images, ratings, and payments in parallel
    const [projects, images, ratings, payments] = await Promise.all([
      pool.query(
        "SELECT u.user_id, p.project_id, p.freelancer_id, p.title, p.description, p.budget_min, p.budget_max, p.project_type, p.project_status, p.deadline, p.date_completed, p.visibility FROM users u LEFT JOIN projects p ON u.user_id = p.user_id WHERE u.email = ? AND u.role = ?",
        [email, role],
      ),
      pool.query(
        "SELECT u.user_id, p.project_id, i.image_id, i.alt_text, i.image_url FROM users u LEFT JOIN projects p ON u.user_id = p.user_id LEFT JOIN images i ON p.project_id = i.project_id WHERE u.email = ? AND u.role = ?",
        [email, role],
      ),
      pool.query(
        "SELECT u.user_id, p.project_id, r.rate_id, r.freelancer_id, r.reviewer_id, r.reviwee_id, r.rating, r.rating_comment, r.created_at FROM users u LEFT JOIN projects p ON u.user_id = p.user_id LEFT JOIN ratings r ON p.project_id = r.project_id WHERE u.email = ? AND u.role = ?",
        [email, role],
      ),
      pool.query(
        "SELECT u.user_id, p.project_id, p.user_id, b.payment_id, b.freelancer_id, b.amount, b.payment_status, b.payment_method, b.created_at FROM users u LEFT JOIN projects p ON u.user_id = p.user_id LEFT JOIN payments b ON p.project_id = b.project_id WHERE u.email = ? AND u.role = ?",
        [email, role],
      ),
    ]);

    return res.status(200).json({
      result: {
        projects: projects[0],
        images: images[0],
        ratings: ratings[0],
        payments: payments[0],
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
