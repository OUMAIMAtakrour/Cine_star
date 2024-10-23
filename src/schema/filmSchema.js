const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  score: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String },
  createdAt: { type: Date, default: Date.now }
});
const filmSchema = new mongoose.Schema({
  name: { type: String, required: true },
  duration: { type: Number, required: true },
  image: { type: String, required: true },
  video: { type: String, required: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  ratings: [ratingSchema],
  averageRating: { type: Number, default: 0 },
  totalRatings: { type: Number, default: 0 }
});






module.exports = mongoose.model("Film", filmSchema);
