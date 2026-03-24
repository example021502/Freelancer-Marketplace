const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const { get_table } = require("./get_table_config");
const jwt_secret = "my_super_secret_key_021502";

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());

// MySQL connection pool
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "freelancer_db",
  connectionLimit: 5,
  queueLimit: 0,
  waitForConnections: true,
});

app.listen(port, () => console.log(`Server running on port ${port}`));

// User Registration Route
app.post("/api/add/users", async (req, res) => {
  const {
    name,
    email,
    role,
    mobile_number,
    country,
    profile_picture,
    password,
  } = req.body;

  try {
    // 1. Check if email is already taken
    const [exist] = await pool
      .promise()
      .query("SELECT email FROM users WHERE email = ?", [email]);
    if (exist.length > 0) {
      return res.status(409).json({ message: "Email already exists" });
    }

    // 2. Hash the incoming plain-text password
    const hash = await bcrypt.hash(password, 10);

    // 3. Insert into database using 'password_hash' column
    const sql =
      "INSERT INTO users(name, email, role, mobile_number, country, profile_picture, created_at, password_hash) VALUES(?,?,?,?,?,?,NOW(),?)";

    await pool
      .promise()
      .query(sql, [
        name,
        email,
        role,
        mobile_number,
        country,
        profile_picture,
        hash,
      ]);

    res.status(201).json({ message: "Account created successfully!" });
  } catch (e) {
    console.error(`Database Error: ${e.message}`);
    res
      .status(500)
      .json({ message: "Internal server error during registration" });
  }
});

// User Login Route
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  // Look for the hashed password in the 'password_hash' column
  const sql = "SELECT name, role, password_hash FROM users WHERE email = ?";

  pool.query(sql, [email], async (error, result) => {
    if (error) return res.status(500).json({ message: "Database error" });
    if (result.length === 0)
      return res.status(404).json({ message: "User not found" });

    // Compare plain-text password with the stored hash
    const user = result[0];
    try {
      const isValid = await bcrypt.compare(password, user.password_hash);
      if (!isValid) {
        return res.status(401).json({ message: "Incorrect password" });
      }

      const token = jwt.sign(
        {
          name: user.name,
          email: email,
          role: user.role,
        },
        jwt_secret,
        { expiresIn: "24h" },
      );

      res.status(200).json({
        message: "Welcome back!",
        token: token,
      });
    } catch (e) {
      return res.json({ message: "Error processing login" });
    }
  });
});

// Fetching all users
app.get("/api/get/users", (req, res) => {
  pool.query(
    "SELECT name, email, role, mobile_number, country, profile_picture FROM users",
    (err, result) => {
      if (err) return res.status(500).json({ message: "Database error" });
      return res.status(200).send(result);
    },
  );
});

app.get("/api/get/projects", (req, res) => {
  const sql = `SELECT p.project_id, p.user_id, p.freelancer_id, p.title, p.description, p.budget_min, p.budget_max, p.project_type, i.alt_text, i.image_url FROM projects p LEFT JOIN images i ON p.project_id = i.project_id WHERE p.visibility = "public"`;
  pool.query(sql, (err, result) => {
    if (err) return res.status(500).json({ message: "Database error" });
    return res.status(200).send(result);
  });
});

// getting user information from token
app.get("/api/userData", (req, res) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Access Denied!" });
  jwt.verify(token, jwt_secret, (err, decode) => {
    if (err) return res.status(403).json({ message: "Invalid Token!" });
    res.status(200).json({ user: decode });
  });
});

// getting specific user
app.get("/api/get/:table/:id", async (req, res) => {
  const { table, id } = req.params;
  const { fields, targetField } = req.query;
  const requestedFields = fields ? fields.split(",") : [];
  const table_config = get_table(table);

  if (!table_config)
    return res.status(400).json({ message: "Invalid or Unsupported Table" });
  if (table_config.forbidden_fields.includes(targetField))
    return res.status(400).json({ message: "Invalid target search field" });
  const allowed_fields = requestedFields.filter(
    (field) => !table_config?.forbidden_fields.includes(field),
  );

  const sql_prefix = targetField === "user_id" ? "u" : "main";

  const users_fields = [
    "name",
    "email",
    "mobile_number",
    "country",
    "profile_picture",
  ];
  const processed_fields = allowed_fields.map((field) =>
    users_fields.includes(field) ? `u.${field}` : `main.${field}`,
  );

  const selected_fields =
    allowed_fields.length > 0 ? processed_fields.join(", ") : "*";
  const sql = `SELECT ${selected_fields} FROM ?? AS main LEFT JOIN users AS u ON main.user_id = u.user_id WHERE ${sql_prefix}.${targetField} = ?`;

  pool.query(sql, [table, id], (err, result) => {
    if (err) {
      res.status(500).json({ message: "Database error" });
      console.log(err);
      return;
    }

    return res.status(200).json({ result: result[0] });
  });
});
