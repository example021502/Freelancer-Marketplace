const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");

const port = 8080;

const app = express();
app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "freelancer_db",
  connectionLimit: 5,
  waitForConnections: true,
  queueLimit: 0,
});

pool.getConnection((err, connection) => {
  if (err) return console.log(`Error: ${err}`);
  console.log(`Database connected Successfully`);
  connection.release();
});

app.get("/api/get/Users", (req, res) => {
  const query = "SELECT * FROM Users";

  pool.query(query, (err, result) => {
    if (err) res.status(500).send(err);
    else res.status(200).send(result);
  });
});

app.post("/api/login", (req, res) => {
  const sql = "SELECT password FROM Users WHERE username = ?";
  const { username, password } = req.body;

  pool.query(sql, [username], async (error, result) => {
    if (error)
      return res.status(500).send({ type: "error", text: "Database error" });
    if (result.length === 0)
      return res.status(404).send({ type: "error", text: "No User found" });
    const user = result[0];

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      res.send({ type: "error", text: "Wrong Password" });
      return;
    }

    res.send({ type: "success", text: "Login Successfully" });
  });
});

app.post("/api/add/Users", async (req, res) => {
  const { user_id, username, email, date_joined, password } = req.body;

  const hash = await bcrypt.hash(password, 13);
  const sql =
    "INSERT INTO Users(user_id, username, email, date_joined, password) VALUES(?,?,?,?,?)";

  pool.query(sql, [user_id, username, email, date_joined, hash], (err) => {
    if (err) res.status(500).send({ type: "error", text: err });
    else res.send({ type: "success", text: "Database updated successfully" });
  });
});

app.listen(port, () => console.log(`App running on port ${port}`));
