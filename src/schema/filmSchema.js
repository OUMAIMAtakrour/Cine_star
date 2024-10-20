const mongoose = require("mongoose");

const filmSchema = new mongoose.Schema({
  name: { type: String, required: true },
  duration: { type: Number, required: true },
  image: { type: String, required: true },
  video: { type: String, required: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Film", filmSchema);
