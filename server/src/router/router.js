const express = require("express");
const db = require("../database/db.js");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

//  INIT
const router = express.Router();

//  SIGNING UP
router.post("/signup", async (req, res) => {
  try {
    //  TAKING THE CREDENTIALS FROM THE CLIENT
    const { name, email, password } = req.body;

    //  VERIFIYING IF THE EMAIL IS ALREADY SIGNED
    const [emailCheck] = await (
      await db
    ).query("SELECT * FROM users WHERE user_email = ?", [email]);

    if (!emailCheck.length > 0) {
      //  CREATING AN ID FOR THE USER
      const userID = crypto.randomUUID();
      //  HASHING THE PASSWORD
      const newPassword = await bcrypt.hash(password, 10);
      //  CODE TO CONFIRM THE USER EMAIL
      const code = crypto.randomUUID();

      //  SENDING THE VERIFICATION CODE TO THE USER EMAIL -NODEMAILER
      //  <CONFIGURING>
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.USEREMAIL,
          pass: process.env.USERPASSWORD,
        },
      });

      const mailOptions = {
        from: process.env.USEREMAIL,
        to: `${email}`,
        subject: "Verification code",
        html: `<div>
        <p>Verification code</p>
        <h1>${code}</h1>
        </div>`,
      };
      //  <CONFIGURING/>

      //  SENDING THE CODE
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          res.json({ ok: false, message: "Something went wrong\nTry again" });
        } else {
          if (info.accepted) {
            //  CREATING A SESSION VARIABLE TO SAVE THE CREDENTIALS AND THE CODE
            req.session.nextUser = { userID, name, email, newPassword };
            req.session.code = code;
            res.json({ ok: true });

            //  DELETING THE CODE AFTER THREE MINUTES
            setTimeout(() => {
              delete req.session.code;
              delete req.session.nextUser;
              req.session.save();
            }, 180000);
          } else {
            //  IF THERE WHERE NO ERROR BUT THE EMAIL WAS NOT SENT
            res.json({ ok: false, message: "Email not found\nTry again" });
          }
        }
      });
    } else {
      //  IF THE EMAIL IS ALREADY SIGNED
      res.json({ ok: false, message: "Email alrady signed" });
    }
  } catch (error) {
    //  IF SOMETHING WENT WRONG IN THE SERVER
    res.json({ ok: false, message: "Server error\nTry again" });
  }
});

router.post("/code", async (req, res) => {
  //  RECIEVING THE CODE FROM THE CLIENT
  const { code } = req.body;

  //  CHECKING IF THE CODE IN THE SERVER IS SRILL AVAILABLE
  if (req.session.code) {
    // COMPARING THE TWO CODES
    if (code == req.session.code) {
      try {
        //  SIGNING THE USER
        const [signingUpUser] = await (
          await db
        ).query(
          "INSERT INTO users (user_id, user_name, user_email, user_password) VALUES (?)",
          [
            [
              req.session.nextUser.userID,
              req.session.nextUser.name,
              req.session.nextUser.email,
              req.session.nextUser.newPassword,
            ],
          ]
        );

        //  NEW USER SESSION IF THE SIGNING PROCESS HAS SUCCEED
        if (signingUpUser.affectedRows > 0) {
          req.session.userID = req.session.nextUser.userID;
          res.json({ ok: true });
        } else {
          //  IF THE USER WAS NOT SIGNED WITH SUCCESS
          res.json({
            ok: false,
            message: "Try again reloading the page",
          });
        }
      } catch (error) {
        //  IF SERVER ERROR
        res.json({ ok: false, message: "Try again reloading the page" });
      }
    } else {
      //  IF THE CODES DID NOT MATCH
      return res.json({ ok: false, message: "Code does not match" });
    }
  } else {
    //  IF THE CODE IN THE SERVER HAS EXPIRED
    return res.json({
      ok: false,
      message: "Code may expired \n Sign again reloading the page",
    });
  }

  //  DELETING THE SESSION VARIABLES THAT I USE TO GET THE CREDENTIALS AND THE CODE FROM A VIEW TO ANOTHER
  delete req.session.code;
  delete req.session.nextUser;
  req.session.save();
});

//  VERIFIYING IF THE USER IS SIGNED
router.get("/verify", (req, res) => {
  if (req.session.userID) {
    res.json({ log: true });
    console.log(req.session.userID);
  } else {
    res.json({ log: false });
  }
});

//  LOGIN IN
router.post("/login", async (req, res) => {
  //  CREDENTIALS FROM THE CLIENT
  const { email, password } = req.body;

  //  CHECKING IF THE EMAIL IS SIGNED
  const [emailCheck] = await (
    await db
  ).query("SELECT * FROM users WHERE user_email = ?", [email]);

  //  ALSO CHECKING THE EMAIL
  if (emailCheck.length > 0) {
    //  COMPARING IF THE PASSWORD FROM THE USER IS THE SAME AS THE ONE IN THE DATABASE
    bcrypt.compare(password, emailCheck[0].user_password, (err, result) => {
      if (err)
        return res.json({ ok: false, message: "Server error\nTry again" });

      if (result) {
        //  IF THE PASSWORD IS CORRECT
        req.session.userID = emailCheck[0].user_id;
        res.json({ ok: true });
      } else {
        //  IF NOT
        res.json({ ok: false, message: "Wrong password" });
      }
    });
  } else {
    //  IF THE USER WAS NOT SIGNED
    res.json({ ok: false, message: "User does not exist" });
  }
});

module.exports = router;
