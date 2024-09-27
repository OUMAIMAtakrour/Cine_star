const SeatService = require("../services/seatService");

class SeatController {
  async createSeat(req, res) {
    try {
      const seat = await SeatService.createSeat(req.body);
      res.status(201).json(seat);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteSeat(req, res) {
    try {
      await SeatService.deleteSeat(req.params.id);
      res.status(200).json({ message: "Seat deleted successfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAllSeats(req, res) {
    try {
      const seats = await SeatService.getAllSeats();
      res.status(200).json(seats);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getSeatById(req, res) {
    try {
      const seat = await SeatService.getSeatById(req.params.id);
      if (!seat) {
        return res.status(404).json({ message: "Seat not found" });
      }
      res.status(200).json(seat);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateSeat(req, res) {
    try {
      const seat = await SeatService.updateSeat(req.params.id, req.body);
      res.status(200).json(seat);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getSeatsByRoom(req, res) {
    try {
      const seats = await SeatService.getSeatsByRoom(req.params.roomId);
      res.status(200).json(seats);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new SeatController();
