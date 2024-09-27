const SeatDao = require("../dao/seatDao");

class SeatService {
  constructor() {
    this.seatDao = new SeatDao();
  }

  async createSeat(seatData) {
    return await this.seatDao.save(seatData);
  }

  async deleteSeat(id) {
    return await this.seatDao.delete(id);
  }

  async getAllSeats() {
    return await this.seatDao.index();
  }

  async getSeatById(id) {
    return await this.seatDao.show(id);
  }

  async updateSeat(id, seatData) {
    return await this.seatDao.update(id, seatData);
  }

  async getSeatsByRoom(roomId) {
    return await this.seatDao.findByRoom(roomId);
  }
}

module.exports = new SeatService();
