const pool = require("../config/db");
const getPaymentsByEmail = async (req, res) => {
  const { email } = req.body;
  const sql = "SELECT u.user_id, f.freelancer";
  const [payments] = await pool.query(sql, [email]);
  return res.status(200).json({ result: payments });
};

module.exports = { getPaymentsByEmail };
