const pool = require("../config/db");

// get user projects
const userProjects = async (req, res) => {
  const { email } = req.params;

  try {
    const [[projects], [payments], [notifications], [images]] =
      await Promise.all([
        pool
          .promise()
          .query(
            "SELECT u.user_id, p.project_id, p.freelancer_id, p.title, p.description, p.budget_min, p.budget_max, p.project_type, p.project_status, p.deadline, p.date_completed, p.visibility FROM users u LEFT JOIN projects p ON u.user_id = p.user_id WHERE u.email = ?",
            [email],
          ),
        pool
          .promise()
          .query(
            "SELECT u.user_id, p.payment_id, p.project_id, p.freelancer_id, p.amout, p.payment_status, p.payment_method, p.created_at FROM users u LEFT JOIN projects p ON u.user_id = p.user_id WHERE u.email = ?",
            [email],
          ),
        pool
          .promise()
          .query(
            "SELECT u.user_id, n.note_id, n.message, n.note_status, n.created_at FROM users u LEFT JOIN notifications n ON u.user_id = n.user_id WHERE u.email = ?",
            [email],
          ),
        pool
          .promise()
          .query(
            "SELECT u.user_id,p.project_id, i.image_id, i.alt_text, i.image_url FROM users u LEFT JOIN projects p ON u.user_id = p.user_id LEFT JOIN images i ON p.project_id = i.project_id WHERE u.email = ?",
            [email],
          ),
      ]);
    if (projects.length === 0)
      return res.status(404).json({ message: "No data Found!" });

    res.status(200).json({ projects, payments, notifications, images });
  } catch (e) {
    console.log(`Error: ${e}`);
    return res.status(500).json({ message: "Internal Error" });
  }
};

module.exports = userProjects;
