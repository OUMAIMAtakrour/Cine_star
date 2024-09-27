const ReservationInterface = require("./../../repositories/interfaces/reservationInterface");
const ReservationModel = require("./../../models/reservation");
const ReservationDao = require("./../../dao/reservationDao");

class ReservationRepository extends ReservationInterface {
  constructor() {
    super();
    this.reservationDao = new ReservationDao();
  }

  index() {
    return this.reservationDao.index();
  }

  async store(req) {
    const { clientId, seatIds, sessionId } = req.body;

    const reservationObj = new ReservationModel(
      null,
      clientId,
      seatIds,
      sessionId
    );

    const reservation = {
      clientId: reservationObj.getClientId(),
      seatIds: reservationObj.getSeatIds(),
      sessionId: reservationObj.getSessionId(),
    };

    return await this.reservationDao.save(reservation);
  }

  async destroy(req) {
    const { id } = req.params;
    if (!id) {
      throw new Error("Reservation ID is required");
    }

    return await this.reservationDao.delete(id);
  }

  show(req) {
    const { id } = req.params;
    if (!id) {
      throw new Error("Reservation ID is required");
    }

    return this.reservationDao.show(id);
  }

  async update(req) {
    const { id } = req.params;
    const { clientId, seatId, sessionId } = req.body;

    if (!id) {
      throw new Error("Reservation ID is required");
    }

    const reservationData = {
      client_id: clientId,
      seat_id: seatId,
      session_id: sessionId,
    };

    return await this.reservationDao.update(id, reservationData);
  }
}

module.exports = ReservationRepository;
