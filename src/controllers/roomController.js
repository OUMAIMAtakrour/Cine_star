const RoomService = require("../services/roomService");

class RoomController {
  constructor(roomService) {
    this.roomService = roomService;
  }

  async store(req, res) {
    try {
      const room = await this.roomService.store(req);
      res.status(201).json(room);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async destroy(req, res) {
    try {
      await this.roomService.destroy(req);
      return res.status(200).json({ message: "Room deleted successfully" });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async index(req, res) {
    try {
      const rooms = await this.roomService.index();
      return res.json(rooms);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async show(req, res) {
    try {
      const room = await this.roomService.show(req);
      if (!room) {
        return res.status(404).json({ message: "Room not found" });
      }
      return res.status(200).json(room);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const room = await this.roomService.update(req);
      return res.json(room);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

const roomService = new RoomService();
const roomController = new RoomController(roomService);

module.exports = roomController;
