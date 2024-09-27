const Reservation = require("../schema/reservationSchema");
const mongoose = require("mongoose");

class ReservationDao {
  save(reservation) {
    return Reservation.create(reservation);
  }

  delete(id) {
    return Reservation.deleteOne({ _id: id });
  }

  index() {
    return Reservation.find();
  }

  show(id) {
    return Reservation.findOne({ _id: id });
  }

  update(id, reservationData) {
    return Reservation.updateOne(
      { _id: new mongoose.Types.ObjectId(id) },
      { $set: reservationData }
    );
  }
}

module.exports = ReservationDao;
