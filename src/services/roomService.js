const RoomRepository = require("../repositories/implementations/roomRepository");

class RoomService {
  constructor() {
    this.roomRepository = new RoomRepository();
  }

  async store(req) {
    return await this.roomRepository.store(req);
  }

  async destroy(req) {
    return await this.roomRepository.destroy(req);
  }

  async index() {
    return await this.roomRepository.index();
  }

  async show(req) {
    return await this.roomRepository.show(req);
  }

  async update(req) {
    return await this.roomRepository.update(req);
  }
}

module.exports = RoomService;
