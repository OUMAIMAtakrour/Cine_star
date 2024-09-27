const RoomInterface = require("../interfaces/roomInterface");
const RoomModel = require("../../models/room");
const RoomDao = require("../../dao/roomDao");

class RoomRepository extends RoomInterface {
  constructor() {
    super();
    this.roomDao = new RoomDao();
  }

  index() {
    return this.roomDao.index();
  }

  async store(req) {
    const { name, capacity } = req.body;

    if (!req.user || !req.user.adminData || !req.user.adminData._id) {
      throw new Error("Admin not authenticated or admin data missing");
    }

    const admin_id = req.user.adminData._id;

    const roomObj = new RoomModel(null, name, capacity, admin_id);

    const room = {
      name: roomObj.getName(),
      capacity: roomObj.getCapacity(),
      admin_id: roomObj.getAdminId(),
    };

    return await this.roomDao.save(room);
  }

  async destroy(req) {
    const { id } = req.params;
    if (!id) {
      throw new Error("Room ID is required");
    }

    return await this.roomDao.delete(id);
  }

  show(req) {
    const { id } = req.params;
    if (!id) {
      throw new Error("Room ID is required");
    }

    return this.roomDao.show(id);
  }

  async update(req) {
    const { id } = req.params;
    const { name, capacity } = req.body;

    if (!req.user || !req.user.adminData || !req.user.adminData._id) {
      throw new Error("Admin not authenticated or admin data missing");
    }

    const admin_id = req.user.adminData._id;

    if (!id) {
      throw new Error("Room ID is required");
    }

    const roomData = { name, capacity, admin_id };

    return await this.roomDao.update(id, roomData);
  }
}

module.exports = RoomRepository;
