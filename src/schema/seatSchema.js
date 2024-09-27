const mongoose = require('mongoose');

const seatStatusEnum = ['AVAILABLE', 'RESERVED'];

const seatSchema = new mongoose.Schema({

  room_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room",
    required: true
  },
  status: {
    type: String,
    enum: seatStatusEnum,
    default: 'AVAILABLE'
  }
}, { collection: "seats" });

const Seat = mongoose.model("Seat", seatSchema);
module.exports = Seat;