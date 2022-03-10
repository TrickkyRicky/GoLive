const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");

const User = require("../models/user.js");
require("dotenv").config();

// formidable incase google icon is valid and we need to store it here
exports.register = async (req, res, next) => {
  const email = req.body.email.toLowerCase();
  const username = req.body.username;
  const password = req.body.password;

  crypto.randomBytes(32, async (err, buffer) => {
    const streamKey = `live_${buffer.toString("hex")}`;
    try {
      const checkUser = await User.findOne({ email: email });

      if (checkUser) {
        const error = new Error("This email is already in use");
        error.statusCode = 409;
        throw error;
      }

      const hashedPass = await bcrypt.hash(password, 12);

      const user = new User({
        email: email,
        password: hashedPass,
        username: username,
        streamKey: streamKey,
        live: false,
      });

      const result = await user.save();
      // transporter.sendMail({
      //   to: email,
      //   from: "cognizantecommercecapstone@gmail.com",
      //   subject: "Signup succeeded!",
      //   html: "<h1>You have successfully signed up!</h1>",
      // });

      res.status(201).json({ message: "Account created", userId: result._id });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  });
};

exports.login = async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const user = await User.findOne({ username: username });
    if (!user) {
      const error = new Error("No user with this username exist");
      error.statusCode = 401;
      throw error;
    }

    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      const error = new Error("Wrong Password");
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign(
      {
        email: user.email,
        userId: user._id.toString(),
      },
      process.env.JPASS
      // { expiresIn: "1h" }
    );

    //cookies
    res.cookie("t", token, {
      expire: new Date() + 9999,
    });

    res.status(200).json({
      token: token,
      userId: user.id.toString(),
      username: user.username,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.logout = (req, res) => {
  res.clearCookie("t");

  return res.status("200").json({
    message: "signed out",
  });
};
