const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Rt@n2010",
  database: "election",
});

module.exports = db;
