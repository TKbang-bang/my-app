const session = require("express-session");
const MySqlSession = require("express-mysql-session")(session);
require("dotenv").config();

const options = {
  host: "localhost",
  port: 3306,
  user: "root",
  database: "my_app",
  password: process.env.MYPASSWORD,
};

const myStore = new MySqlSession(options);

module.exports = myStore;
