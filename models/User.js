const { Schema, model } = require("mongoose");

const schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  balance: { type: Number, required: true },
  vacationList: [{ type: Object, required: true }]
});

module.exports = model("User", schema);
