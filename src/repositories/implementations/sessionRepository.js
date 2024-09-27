const SessionInterface = require("../interfaces/sessionInterface");
const SessionModel = require("../../models/session");
const SessionDao = require("../../dao/sessionDao");

class SessionRepository extends SessionInterface {
  constructor() {
    super();
    this.sessionDao = new SessionDao();
  }

  index() {
    return this.sessionDao.index();
  }

  async store(req) {
    const { film_id, room_id, hour, date } = req.body;

    if (!req.user || !req.user.adminData || !req.user.adminData._id) {
      throw new Error("Admin not authenticated or admin data missing");
    }

    const admin_id = req.user.adminData._id;

    const sessionObj = new SessionModel(
      null,
      film_id,
      room_id,
      admin_id,
      hour,
      new Date(date)
    );

    const session = {
      film_id: sessionObj.getFilmId(),
      room_id: sessionObj.getRoomId(),
      admin_id: sessionObj.getAdminId(),
      hour: sessionObj.getHour(),
      date: sessionObj.getDate(),
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

  show(req) {
    const { id } = req.params;
    if (!id) {
      throw new Error("Session ID is required");
    }

    return this.sessionDao.show(id);
  }

  async update(req) {
    const { id } = req.params;
    const { film_id, room_id, hour, date } = req.body;

    if (!req.user || !req.user.adminData || !req.user.adminData._id) {
      throw new Error("Admin not authenticated or admin data missing");
    }

    const admin_id = req.user.adminData._id;

    if (!id) {
      throw new Error("Session ID is required");
    }   

    const sessionData = {
      film_id,
      room_id,
      admin_id,
      hour,
      date: new Date(date),
    };

    return await this.sessionDao.update(id, sessionData);
  }
}

module.exports = SessionRepository;
