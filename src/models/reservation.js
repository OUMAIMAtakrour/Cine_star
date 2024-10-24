class Reservation {
  constructor(id, clientId, seats, sessionId) {
    this.id = id;
    this.clientId = clientId;
    this.seats = seats;
    this.sessionId = sessionId;
  }

  getClientId() {
    return this.clientId;
  }

  getSeatIds() {
    return this.seats;
  }

  getSessionId() {
    return this.sessionId;
  }

  getId() {
    return this.id;
  }
}

module.exports = Reservation;