class Reservation {
  constructor(id, clientId, seatIds, sessionId) {
    this.id = id;
    this.clientId = clientId;
    this.seatIds = seatIds;
    this.sessionId = sessionId;
  }

  getClientId() {
    return this.clientId;
  }

  getSeatIds() {
    return this.seatIds;
  }

  getSessionId() {
    return this.sessionId;
  }

  getId() {
    return this.id;
  }
}

module.exports = Reservation;