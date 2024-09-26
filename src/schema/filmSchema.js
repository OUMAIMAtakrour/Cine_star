const mongoose = require('mongoose');

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
    admin_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
  },
  { collection: "films" }
);

const Film = mongoose.model("Film", filmSchema);
module.exports = Film;