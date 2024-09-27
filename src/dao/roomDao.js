const Room = require("../schema/roomSchema");
const mongoose = require('mongoose');

class RoomDao {
    save(room) {
        return Room.create(room);
    }

    delete(id) {
        return Room.deleteOne({ _id: id });
    }

    index() {
        return Room.find();
    }

    show(id) {
        return Room.findOne({ _id: id });
    }

    update(id, roomData) {
        return Room.updateOne(
            { _id: new mongoose.Types.ObjectId(id) },
            { $set: roomData }
        );
    }
}

module.exports = RoomDao;