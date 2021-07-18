const mysql = require("mysql2");

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "Rt@n2010",
    database: "business",
  },
  console.log("Connected to the business database")
);

module.exports = db;
