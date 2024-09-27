class Seat {
  constructor(id, roomId, status) {
    this.id = id;
    this.roomId = roomId;
    this.status = status;
  }

  getId() {
    return this.id;
  }

  getRoomId() {
    return this.roomId;
  }
  getStatus() {
    return this.status;
  }
}

module.exports = Seat;
