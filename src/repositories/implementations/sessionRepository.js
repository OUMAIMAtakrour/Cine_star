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
    
    if (!film_id || !room_id || !hour || !date) {
      throw new Error("Missing required fields: film_id, room_id, hour, and date are required");
    }

    if (!sessionData.user || !sessionData.user._id) {
      throw new Error("Admin not authenticated or admin data missing");
    }

    const user_id = sessionData.user._id;

    const validHours = ["10:00", "13:00", "16:00", "19:00", "22:00"];
    if (!validHours.includes(hour)) {
      throw new Error(`Invalid hour. Must be one of: ${validHours.join(', ')}`);
    }

    const room = await this.roomDao.show(room_id);
    if (!room) {
      throw new Error("Room not found");
    }

    const SEATS_PER_ROW = 10;
    const seats = [];
    
    const totalRows = Math.ceil(room.capacity / SEATS_PER_ROW);
    let remainingSeats = room.capacity;
    
    for (let rowIndex = 0; rowIndex < totalRows; rowIndex++) {
      const rowLetter = String.fromCharCode(65 + rowIndex);
      const seatsInThisRow = Math.min(SEATS_PER_ROW, remainingSeats);
      
      for (let seatNum = 1; seatNum <= seatsInThisRow; seatNum++) {
        seats.push({
          row: rowLetter,
          number: seatNum,
          status: "Available"
        });
      }
      
      remainingSeats -= seatsInThisRow;
    }

    const sessionObj = {
      film_id: film_id,
      room_id: room_id,
      user_id: user_id,
      hour: hour,
      date: new Date(date),
      seats: seats
    };

    return await this.sessionDao.save(sessionObj);
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

  async update(updatedSession) {
    const { id } = updatedSession.params;
    const { film_id, room_id, hour, date, seats } = updatedSession.body;

    if (!updatedSession.user || !updatedSession.user._id) {
      throw new Error("Admin not authenticated or admin data missing");
    }

    if (!id) {
      throw new Error("Session ID is required");
    }

    if (!film_id || !room_id || !hour || !date) {
      throw new Error("Missing required fields: film_id, room_id, hour, and date are required");
    }

    const sessionObj = {
      film_id: film_id,
      room_id: room_id,
      user_id: updatedSession.user._id,
      hour: hour,
      date: new Date(date),
      seats: seats
    };

    return await this.sessionDao.update(id, sessionObj);
  }
}

module.exports = SessionRepository;