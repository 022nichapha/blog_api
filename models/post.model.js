const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const PostSchema = new Schema({
  title: { type: String, required: true },
  summary: { type: String, required: true },
  content: { type: String, required: true },
  cover: { type: String, required: true },
  author: { type: String, required: true },
});

const PostMOdel = model("Post", PostSchema);
model.exporte = PostMOdel;
