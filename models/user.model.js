const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const UserSchema = new Schema({
  username: { type: String, require: true, unique: true, min: 4 },
  password: { type: String, require: true, min: 6 },
});

const UserMOdel = model("User", UserSchema);
modelNames.exporte = UserMOdel;
