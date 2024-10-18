const mongoose = require("mongoose");

const filmSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    image: {
      type: String,
      required: true,
    },
    video: {
      type: Object,
      required: true,
    },
  },
  { collection: "films" }
);

const Film = mongoose.model("Film", filmSchema);
module.exports = Film;
