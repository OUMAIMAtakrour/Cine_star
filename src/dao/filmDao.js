const Film = require("../schema/filmSchema");

const mongoose = require('mongoose');


class FilmDao{
    save(film){
        return Film.create(film)
    }

    delete(id) {
        return Film.deleteOne({ _id: id });
    }
    index(){
        return Film.find()
    }

    show(id){
        return Film.findOne({_id: id})
    }

    update(id, filmData) {
        return Film.updateOne(
            { _id: new mongoose.Types.ObjectId(id) },
            { $set: filmData }
        );
    }
}

module.exports = FilmDao;
