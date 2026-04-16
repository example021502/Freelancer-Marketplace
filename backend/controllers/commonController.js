const pool = require("../config/db");

// Getting specific user or data from any table Controller
const getSpecificData = async (req, res) => {
  const { table_name, target_field, target_value } = req.params;

  if (!table_name) {
    return res.status(400).json({ message: "Missing table_name parameter" });
  }
  if (!target_field) {
    return res.status(400).json({ message: "Missing target_field parameter" });
  }
  if (!target_value) {
    return res.status(400).json({ message: "Missing target_value parameter" });
  }

  // check if the requested fields is not forbidden
  if (["password_hash", "password"].includes(target_field))
    return res.status(400).json({ message: "Target field is forbbiden!" });

  // query to get specific data from any table
  const sql = `SELECT * FROM ?? WHERE ?? = ?`;

  // database pooling
  try {
    const response = await pool.query(sql, [
      table_name,
      target_field,
      target_value,
    ]);
    if (response.length === 0)
      return res.status(404).json({ message: "Data not found" });
    return res.status(200).json({ result: response[0][0] });
  } catch (e) {
    console.log(`Error: ${e}`);
    return res
      .status(500)
      .json({ message: "An error occurred while fetching data" });
  }
};
module.exports = {
  getSpecificData,
};
