class Session {
    constructor(id, filmId, roomId, adminId, hour, date) {
      this.id = id;
      this.filmId = filmId;
      this.roomId = roomId;
      this.adminId = adminId;
      this.hour = hour;
      this.date = date;
    }
  
    getId() { return this.id; }
    getFilmId() { return this.filmId; }
    getRoomId() { return this.roomId; }
    getAdminId() { return this.adminId; }
    getHour() { return this.hour; }
    getDate() { return this.date; }
  }
  
  module.exports = Session;