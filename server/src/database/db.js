const mysql = require("mysql2/promise");
require("dotenv").config();

const db = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: process.env.MYPASSWORD,
  database: "my_app",
});

module.exports = db;
