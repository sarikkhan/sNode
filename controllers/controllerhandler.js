const User = require("../model/UserSchema");
const bcrypt = require("bcryptjs");
// const { check, validationResult } = require("express-validator");
// const { model } = require("mongoose");

const register = function (req, res, next) {
  const name = req.body.name;
  const password = req.body.password;
  const username = req.body.username;

  User.findOne({ username: username })
    .then((userData) => {
      if (userData) {
        const error = new Error("user already exist");
        error.statusCode = 401;
        throw error;
      }
      return bcrypt.hash(password, 10);
    })
    .then((hashdpassword) => {
      const user = new User({
        name: name,
        password: hashdpassword,
        username: username,
      });
      return user.save();
    })
    .then((userData) => {
      return res.json({
        message: "completed signup",
        userId: userData._id,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      res.json({
        message: err.message,
        data: err.data,
        status: err.statusCode || 500,
      });
    });
};
const home = function (req, res, next) {
  return res.send("homePage it is");
};

const login = function (req, res, next) {
  const password = req.body.password;
  const username = req.body.username;
  console.log(username, password);
  User.findOne({ username: username })
    .then((userData) => {
      if (!userData) {
        const error = "username is not registered";
        res.json({
          message: "username is not registered",
        });
        throw new Error(error);
      }
      return bcrypt.compare(password, userData.password);
    })
    .then((isEqual) => {
      if (!isEqual) {
        res.json({
          message: "password not correct",
        });
      } else {
        res.json({
          message: "login succefully",
        });
      }
    })
    .catch((err) => {
      // if (err) {
      // return res.json({
      //   message: err,
      // });
      // }
    });
};

module.exports.login = login;
module.exports.register = register;
module.exports.home = home;
