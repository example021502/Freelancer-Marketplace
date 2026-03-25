const pool = require("../config/db");

// Fetching all users Controller
const getAllUsers = (req, res) => {
  pool.query(
    "SELECT name, email, role, mobile_number, country, profile_picture FROM users",
    (err, result) => {
      if (err) return res.status(500).json({ message: "Database error" });
      return res.status(200).send(result);
    },
  );
};

module.exports = {
  getAllUsers,
};
