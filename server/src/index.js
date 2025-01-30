const express = require("express");
const router = require("./router/router.js");
const cors = require("cors");
const session = require("express-session");
const myStore = require("./mySession.js");
const path = require("path");

//  ENV CONFIG
require("dotenv").config();

//  INIT
const app = express();

//  SETS
app.set("port", process.env.PORT || 3000);

//  MIDLEWARES
app.use(
  cors({
    origin: process.env.CLIENTURL,
    methods: ["GET", "POST", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

//  SESSION
app.use(
  session({
    key: "my_user_cookie",
    secret: process.env.MYSECRET,
    store: myStore,
    resave: false,
    saveUninitialized: false,
  })
);

//  ROUTER
app.use(router);

//  OUT
app.listen(app.get("port"), () => console.log("Server on"));
