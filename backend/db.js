const mysql = require("mysql2/promise");

const db_pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "freelancer_db",
});

module.exports = db_pool;
