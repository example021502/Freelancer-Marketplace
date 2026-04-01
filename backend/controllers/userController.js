const pool = require("../config/db");

// Fetching all users Controller
const getAllUsers = async (req, res) => {
  try {
    const [users] = await pool.query(
      "SELECT name, email, role, mobile_number, country, profile_picture FROM users",
    );
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }
    return res.status(200).json({ users });
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getAllUsers,
};
