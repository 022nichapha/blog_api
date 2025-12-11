const express = require("express");
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT;
const BASE_URL = process.env.BASE_URL;
const DB_URL = process.env.DB_URL;

app.use(cors({ origin: BASE_URL, credentials: true }));
app.get("/", (req, res) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  res.send("<h1>Welcome to SE NPRU BLOG restful API<h1>");
});

if (!DB_URL) {
  console.error("DB URL is missing. Please set it  in you .env file");
} else {
  try {
    mongoose.connect(DB_URL).then(() => {
      console.log("MongoDB connect successfully");
    });
  } catch (error) {
    console.log("MongoDB connection error:", error);
  }
}

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
});
