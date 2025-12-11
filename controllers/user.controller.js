const UserModel = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.SECRET;

exports.register = async (req, res) => {
    const {username, password} = req;
    if(!username || !password) {
        res.status(400).send({
            message:"Please Change username & Password"
        });
    }
    const existingUser = await UserModel.findOne({ username });
    if(existingUser){
        return res.status(400).send({
            message: "This username is already existed",
        })
    }

    try {
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);
        const user = await UserModel.create({
            username,
            password:hashedPassword,
        });
        res.send(201)({
            message:"User Register Succesfully",
        });
    } catch (error) {
        res.status(500).send({
            message: error.message||"Some Thing Error while registering a new user",
        });
    }
};

exports.login = async (req,res) => {};