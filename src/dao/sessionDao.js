const Session = require("../schema/sessionSchema");
const mongoose = require("mongoose");

class SessionDao {
  save(session) {
    return Session.create(session);
  }

  delete(id) {
    return Session.deleteOne({ _id: id });
  }

  index() {
    return Session.find().populate("film_id").populate("room_id");
  }

  show(id) {
    return Session.findOne({ _id: id }).populate("film_id").populate("room_id");
  }

  update(id, sessionData) {
    return Session.findByIdAndUpdate(id, sessionData, { new: true })
      .populate("film_id")
      .populate("room_id");
  }
}

module.exports = SessionDao;
