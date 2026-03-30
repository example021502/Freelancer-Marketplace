const pool = require("../config/db");

const userProjects = async (req, res) => {
  const { email } = req.params;

  try {
    const sql1 =
      "SELECT u.user_id, p.project_id FROM users u LEFT JOIN projects p ON u.user_id = p.user_id WHERE email=?";
    const [rows] = await pool.promise().query(sql1, [email]);
    if (rows.length === 0)
      return res.status(404).json({ message: "User not found!" });
    const user_id = rows[0].user_id;
    const project_id = rows[0].project_id;
    const [[projects], [payments], [notifications], [images]] =
      await Promise.all([
        pool
          .promise()
          .query("SELECT * FROM projects WHERE user_id = ?", [user_id]),
        pool
          .promise()
          .query("SELECT * FROM payments WHERE user_id = ?", [user_id]),
        pool
          .promise()
          .query("SELECT * FROM notifications WHERE user_id = ?", [user_id]),
        pool
          .promise()
          .query("SELECT * FROM images WHERE project_id = ?", [project_id]),
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
