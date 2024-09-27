const SeatInterface = require("./../interfaces/seatInterface");
const SeatModel = require("./../../models/seat");
const SeatDao = require("./../../dao/seatDao");

class SeatRepository extends SeatInterface {
  constructor() {
    super();
    this.seatDao = new SeatDao();
  }

  index() {
    return this.seatDao.index();
  }

  async store(req) {
    const { room_id, status } = req.body;

    if (!room_id) {
      throw new Error("Room ID is required");
    }

    const seatObj = new SeatModel(null, room_id, status);

    const seatData = {
      room_id: seatObj.getRoomId(),
      status: seatObj.getStatus(),
    };

    return await this.seatDao.save(seatData);
  }

  async destroy(req) {
    const { id } = req.params;

    if (!id) {
      throw new Error("Seat ID is required");
    }

    return await this.seatDao.delete(id);
  }

  show(req) {
    const { id } = req.params;

    if (!id) {
      throw new Error("Seat ID is required");
    }

    return this.seatDao.show(id);
  }

  async update(req) {
    const { id } = req.params;
    const { room_id, status } = req.body;

    if (!id) {
      throw new Error("Seat ID is required");
    }

    const seatData = { room_id, status };

    return await this.seatDao.update(id, seatData);
  }

  getSeatsByRoom(req) {
    const { roomId } = req.params;

    if (!roomId) {
      throw new Error("Room ID is required");
    }

    return this.seatDao.findByRoom(roomId);
  }
}

module.exports = SeatRepository;
