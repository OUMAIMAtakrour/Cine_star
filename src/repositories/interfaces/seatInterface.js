class SeatInterface {
  constructor() {
    if (new.target === SeatInterface) {
      throw new Error("Cannot instantiate an abstract class.");
    }
  }

  store(req) {
    throw new Error("Must be implemented.");
  }

  destroy(req) {
    throw new Error("Must be implemented.");
  }

  index() {
    throw new Error("Must be implemented.");
  }

  show(req) {
    throw new Error("Must be implemented.");
  }

  update(req) {
    throw new Error("Must be implemented.");
  }

  getSeatsByRoom(req) {
    throw new Error("Must be implemented.");
  }
}

module.exports = SeatInterface;
