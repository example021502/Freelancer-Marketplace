const pool = require("../config/db");

// Fetching all projects Controller
const getAllProjects = (req, res) => {
  const sql = `SELECT f.rating, p.project_id, p.user_id, p.freelancer_id, p.title, p.description, p.budget_min, p.budget_max, p.project_type, i.alt_text, i.image_url FROM freelancer_profiles f LEFT JOIN projects p ON f.freelancer_id = p.freelancer_id LEFT JOIN images i ON p.project_id = i.project_id WHERE p.visibility = "public"`;
  pool.query(sql, (err, result) => {
    if (err) return res.status(500).json({ message: "Database error" });
    return res.status(200).send(result);
  });
};

module.exports = {
  getAllProjects,
};
