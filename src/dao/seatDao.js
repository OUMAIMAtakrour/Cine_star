const Seat = require("../schema/seatSchema");

class SeatDao {
  save(seat) {
    return Seat.create(seat);
  }

  delete(id) {
    return Seat.deleteOne({ _id: id });
  }

  index() {
    return Seat.find().populate("room_id");
  }

  show(id) {
    return Seat.findOne({ _id: id }).populate("room_id");
  }

  update(id, seatData) {
    return Seat.findByIdAndUpdate(id, seatData, { new: true }).populate(
      "room_id"
    );
  }

  findByRoom(roomId) {
    return Seat.find({ room_id: roomId });
  }
}

module.exports = SeatDao;
