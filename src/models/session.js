class Session {
  constructor(id, filmId, roomId, userId, hour, date, seats) {
    this.id = id;
    this.filmId = filmId;
    this.roomId = roomId;
    this.userId = userId;
    this.hour = hour;
    this.date = date;
    this.seats = seats;
  }

  getId() {
    return this.id;
  }
  getFilmId() {
    return this.filmId;
  }
  getRoomId() {
    return this.roomId;
  }
  getUserId() {
    return this.userId;
  }
  getHour() {
    return this.hour;
  }
  getDate() {
    return this.date;
  }
  getSeats() {
    return this.seats;
  }
}

module.exports = Session;
