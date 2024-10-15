const SessionInterface = require("../interfaces/sessionInterface");
const SessionModel = require("../../models/session");
const SessionDao = require("../../dao/sessionDao");
const RoomDao = require("../../dao/roomDao");

class SessionRepository extends SessionInterface {
  constructor() {
    super();
    this.sessionDao = new SessionDao();
    this.roomDao = new RoomDao();
  }

  index() {
    return this.sessionDao.index();
  }
  async store(sessionData) {
    const { film_id, room_id, hour, date } = sessionData.body;

    if (!sessionData.user || !sessionData.user._id) {
      throw new Error("Admin not authenticated or admin data missing");
    }

    const user_id = sessionData.user._id;

    const room = await this.roomDao.show(room_id);
    if (!room) {
      throw new Error("Room not found");
    }

    const seats = Array.from({ length: room.capacity }, (_, index) => ({
      seat_number: index + 1,
      status: "Available",
    }));

    const sessionObj = new SessionModel(
      null,
      film_id,
      room_id,
      user_id,
      hour,
      new Date(date),
      seats
    );

    const session = {
      film_id: sessionObj.getFilmId(),
      room_id: sessionObj.getRoomId(),
      user_id: sessionObj.getUserId(),
      hour: sessionObj.getHour(),
      date: sessionObj.getDate(),
      seats: sessionObj.getSeats(),
    };

    return await this.sessionDao.save(session);
  }

  async destroy(req) {
    const { id } = req.params;
    if (!id) {
      throw new Error("Session ID is required");
    }

    return await this.sessionDao.delete(id);
  }

  async show(req) {
    const { id } = req.params;
    if (!id) {
      throw new Error("Session ID is required");
    }

    return await this.sessionDao.show(id);
  }

  async update(req) {
    const { id } = req.params;
    const { film_id, room_id, hour, date, seats } = req.body;

    if (!req.user || !req.user._id) {
      throw new Error("Admin not authenticated or admin data missing");
    }

    const admin_id = req.user._id;

    if (!id) {
      throw new Error("Session ID is required");
    }

    const sessionData = new SessionModel(
      id,
      film_id,
      room_id,
      admin_id,
      hour,
      new Date(date),
      seats
    );

    return await this.sessionDao.update(id, sessionData);
  }
}

module.exports = SessionRepository;
