const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema(
  {
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    sessionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Session",
      required: true,
    },
    seats: [{
      row: {
        type: String,
        required: true
      },
      number: {
        type: Number,
        required: true
      }
    }]
  },
  { collection: "reservations" }
);


const Reservation = mongoose.model("Reservation", reservationSchema);
module.exports = Reservation;
