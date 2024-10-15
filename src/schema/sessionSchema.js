const mongoose = require("mongoose");

const hourEnum = ["10:00", "13:00", "16:00", "19:00", "22:00"];

const sessionSchema = new mongoose.Schema(
  {
    film_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Film",
      required: true,
    },
    room_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    hour: {
      type: String,
      enum: hourEnum,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    seats: [
      {
        row: String,
        number: Number,
        status: {
          type: String,
          enum: ["Available", "Reserved"],
          default: "Available",
        },
      },
    ],
  },

  { collection: "sessions" }
);

const Session = mongoose.model("Session", sessionSchema);
module.exports = Session;
