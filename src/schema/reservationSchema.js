const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema(
  {
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },
    sessionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Session",
      required: true,

      
    },
  },
  { collection: "reservations" }
);

const Reservation = mongoose.model("Reservation", reservationSchema);
module.exports = Reservation;
