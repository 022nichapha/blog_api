const UserModel = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.SECRET;

exports.register = async (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).send({
      message: "Please Change username & Password",
    });
  }
  const existingUser = await UserModel.findOne({ username });
  if (existingUser) {
    return res.status(400).send({
      message: "This username is already existed",
    });
  }

  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const user = await UserModel.create({
      username,
      password: hashedPassword,
    });
    res.send(201)({
      message: "User Register Succesfully",
    });

    
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some Thing Error while registering a new user",
    });
    //login
    try {
      const userDoc = await UserModel.findOne({ username });
      if (!userDoc) {
        res.status(404).send({ message: "User Not Found" });
      }
      const isPasswordMatched = await bcrypt.compareSync(
        password,
        userDoc.password
      );
      if (!isPasswordMatched) {
        return res.status(401).send({ messagen: "Invalid credentials" });
      }
      //login successfully
      jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
        if (err) {
          return res
            .status(500)
            .send({ message: "Internal server error: Autehntication failed" });
        }
        //token generatetion
        res.send({
          message: "user Logged in successfully",
          id: userDoc._id,
          username,
          accessToken: token,
        });
      });
    } catch (error) {
      res.status(500).send({
        message: error.message || "some errors occurred while loggin in user",
      });
    }
  }
};

exports.login = async (req, res) => {};