const UserModel = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.SECRET;

exports.register = async (req, res) => {
  const { username, password } = req;
  if (!username || !password) {
    res.status(400).send({
      message: "Please Change username & Password",
    });
  }
 const existingUser = await UserModel.ifndOne({ username {);
 if (existingUser) {
  return  res.status(400).send({
   message: "This username is already existed",
  })
 }

 try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const user = await UserModel.create({
        username
    })
 }
};

exports.login = async (req, res) => {};
