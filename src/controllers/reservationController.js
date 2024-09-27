const ReservationService = require("../services/reservationService");
const emailService = require("../services/emailService");
class ReservationController {
  constructor(reservationService) {
    this.reservationService = reservationService;
  }

  async store(req, res) {
    try {
      if (!Array.isArray(req.body.seatIds)) {
        return res.status(400).json({ error: "seatIds must be an array" });
      }

      const reservation = await this.reservationService.store(req);

      await emailService.sendConfirmationEmail(
        req.body.clientEmail,
        reservation
      ); 

      res.status(201).json(reservation);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  async destroy(req, res) {
    try {
      await this.reservationService.destroy(req);
      return res
        .status(200)
        .json({ message: "Reservation deleted successfully" });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async index(req, res) {
    try {
      const reservations = await this.reservationService.index();
      return res.json(reservations);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async show(req, res) {
    try {
      const reservation = await this.reservationService.show(req);
      if (!reservation) {
        return res.status(404).json({ message: "Reservation not found" });
      }
      return res.status(200).json(reservation);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const reservation = await this.reservationService.update(req);
      return res.json(reservation);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

const reservationService = new ReservationService();
const reservationController = new ReservationController(reservationService);

module.exports = reservationController;
