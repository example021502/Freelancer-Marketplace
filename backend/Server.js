/* server.js 
   - Receives 'password' from React
   - Hashes it using Bcrypt
   - Saves into 'password_hash' column
*/
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());

// MySQL connection pool
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "", // Add your password if you set one in XAMPP/WAMP
  database: "freelancer_db",
  connectionLimit: 5,
  queueLimit: 0,
  waitForConnections: true,
});

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
  const sql = "SELECT password_hash FROM users WHERE email = ?";

  pool.query(sql, [email], async (error, result) => {
    if (error) return res.status(500).json({ message: "Database error" });
    if (result.length === 0)
      return res.status(404).json({ message: "User not found" });

    // Compare plain-text password with the stored hash
    const isValid = await bcrypt.compare(password, result[0].password_hash);
    if (!isValid) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    res.status(200).json({ message: "Welcome back!" });
  });
});

// Fetching all users
app.get("/api/get/users", (req, res) => {
  pool.query("SELECT id, name, email, role FROM users", (err, result) => {
    if (err) return res.status(500).json({ message: "Database error" });
    return res.status(200).send(result);
  });
});

app.listen(port, () => console.log(`Server running on port ${port}`));
