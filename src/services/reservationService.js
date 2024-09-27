const ReservationRepository = require("../repositories/implementations/reservationRepository");

class ReservationService {
  constructor() {
    this.reservationRepository = new ReservationRepository();
  }

  async store(req) {
    return this.reservationRepository.store(req);
  }

  destroy(req) {
    return this.reservationRepository.destroy(req);
  }

  index() {
    return this.reservationRepository.index();
  }

  show(req) {
    return this.reservationRepository.show(req);
  }

  update(req) {
    return this.reservationRepository.update(req);
  }
}

module.exports = ReservationService;
