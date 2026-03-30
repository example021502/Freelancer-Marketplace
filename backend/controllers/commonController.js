const pool = require("../config/db");
const { get_table } = require("../get_table_config");

// Getting specific user or data from any table Controller
const getSpecificData = async (req, res) => {
  const { table, id } = req.params;
  const { fields, targetField } = req.query;
  if (!targetField) {
    return res.status(400).json({ message: "Missing targetField parameter" });
  }
  const requestedFields = fields ? fields.split(",") : [];
  const table_config = get_table(table);

  // checking if table exist
  if (!table_config)
    return res.status(400).json({ message: "Invalid or Unsupported Table" });
  // check if the requested fields is not forbidden
  if (table_config.forbidden_fields.includes(targetField))
    return res.status(400).json({ message: "Invalid target search field" });
  // filtering out the forbidden fields if included
  const allowed_fields = requestedFields.filter(
    (field) => !table_config?.forbidden_fields.includes(field),
  );

  // table prefixing for a target or common field
  const sql_prefix = targetField === "user_id" ? "u" : "main";

  // only accessible fields in users table
  const users_fields = [
    "name",
    "email",
    "mobile_number",
    "country",
    "profile_picture",
  ];

  // the final prefixed field name to use in the query
  const processed_fields = allowed_fields.map((field) =>
    users_fields.includes(field) ? `u.${field}` : `main.${field}`,
  );

  // joining the selected fields from the req body
  const selected_fields =
    allowed_fields.length > 0 ? processed_fields.join(", ") : "*";
  const sql = `SELECT ${selected_fields} FROM ?? AS main LEFT JOIN users AS u ON main.user_id = u.user_id WHERE ${sql_prefix}.${targetField} = ?`;

  // database pooling
  pool.query(sql, [table, id], (err, result) => {
    if (err) {
      res.status(500).json({ message: "Database error" });
      console.log(err);
      return;
    }

    return res.status(200).json({ result: result[0] });
  });
};

module.exports = {
  getSpecificData,
};
