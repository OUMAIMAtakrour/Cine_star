const Film = require("../schema/filmSchema");
const FilmModel=require("../models/film")

const mongoose = require('mongoose');


class FilmDao{
    async store(filmData) {
        return Film.create(filmData);
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

    async getFilmWithSessions(id, filter = {}) {
        const matchStage = { _id: new mongoose.Types.ObjectId(id) };

        return Film.aggregate([
            {
                $match: matchStage
            },
            {
                $lookup: {
                    from: 'sessions',
                    localField: '_id',
                    foreignField: 'film_id',
                    pipeline: [
                        {
                            $match: filter
                        },
                        {
                            $lookup: {
                                from: 'rooms',
                                localField: 'room_id',
                                foreignField: '_id',
                                as: 'room'
                            }
                        },
                        {
                            $unwind: '$room'
                        },
                        {
                            $sort: {
                                date: 1,
                                hour: 1
                            }
                        }
                    ],
                    as: 'sessions'
                }
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    duration: 1,
                    sessions: {
                        _id: 1,
                        date: 1,
                        hour: 1,
                        room: {
                            _id: 1,
                            name: 1,
                            capacity: 1
                        }
                    }
                }
            }
        ]).then(results => results[0] || null);
    }

    async getAllFilms() {
        return Film.find().lean();
    }
}

module.exports = FilmDao;
