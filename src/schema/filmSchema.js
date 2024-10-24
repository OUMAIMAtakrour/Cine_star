const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  score: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String },
  createdAt: { type: Date, default: Date.now },
});
const filmSchema = new mongoose.Schema({
  name: { type: String, required: true },
  duration: { type: Number, required: true },
  image: { type: String, required: false },
  video: { type: String, required: false },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  ratings: [ratingSchema],
  averageRating: { type: Number, default: 0 },
  totalRatings: { type: Number, default: 0 },
  isMovie: {
    type: Boolean,
    default: false,
    set: function (value) {
      return this.video ? true : false;
    },
  },
});
filmSchema.pre("save", function (next) {
  this.isMovie = this.video ? true : false;
  next();
});

module.exports = mongoose.model("Film", filmSchema);
