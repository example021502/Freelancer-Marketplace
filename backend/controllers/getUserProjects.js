const pool = require("../config/db");

// get user projects
const userProjects = async (req, res) => {
  const { email, user_id } = req.params;

  try {
    const sql = `SELECT  p.*, py.*, i.*, n.* FROM projects p LEFT JOIN payments py ON p.project_id = py.project_id LEFT JOIN images i ON p.project_id = i.project_id LEFT JOIN notifications n ON n.nofitier = ? OR n.recipient = ? WHERE p.client_id = ? OR p.freelancer_id = ?`;
    const [projects] = pool.query(sql, [(user_id, user_id, user_id, user_id)]);
    if (projects.length === 0)
      return res.status(404).json({ message: "No data Found!" });

    res.status(200).json({ result: projects });
  } catch (e) {
    console.log(`Error: ${e}`);
    return res.status(500).json({ message: "Internal Error" });
  }
};

module.exports = userProjects;
