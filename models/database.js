const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "date",
  database: "autostock",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

pool
  .getConnection()
  .then(() => {
    console.log("Connected to the MySQL database!");
  })
  .catch((err) => {
    console.error("Error connecting to the MySQL database:", err);
  });

module.exports = pool;