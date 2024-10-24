const Reservation = require("../schema/reservationSchema");
const mongoose = require("mongoose");

class ReservationDao {
  async save(reservation) {
    return await Reservation.create(reservation);
  }

  async delete(id) {
    return await Reservation.findByIdAndDelete(id);
  }
  

  async index() {
    return await Reservation.find()
      .populate("clientId")
      .populate({
        path: "sessionId",
        populate: {
          path: "film_id room_id",
        },
      });
  }
 
  async show(id) {
    return await Reservation.findById(id)
      .populate("clientId")
      .populate({
        path: "sessionId",
        populate: {
          path: "film_id room_id",
        },
      });
  }

  async update(id, reservationData) {
    return await Reservation.findByIdAndUpdate(id, reservationData, {
      new: true,
    })
      .populate("clientId")
      .populate({
        path: "sessionId",
        populate: {
          path: "film_id room_id",
        },
      });
  }
}

module.exports = ReservationDao;
