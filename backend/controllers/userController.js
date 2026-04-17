const pool = require("../config/db");

// Fetching all users Controller
const getAllUsers = async (req, res) => {
  try {
    const [clients, freelancers, admins] = await Promise.all([
      pool.query("SELECT * FROM clients"),
      pool.query("SELECT * FROM freelancers"),
      pool.query("SELECT * FROM admins"),
    ]);
    if (!clients && !freelancers && !admins) {
      return res.status(404).json({ message: "No users found" });
    }
    return res
      .status(200)
      .json({ result: [clients[0], freelancers[0], admins[0]] });
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getAllUsers,
};
