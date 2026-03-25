const mysql = require("mysql2");

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
module.exports = pool;
