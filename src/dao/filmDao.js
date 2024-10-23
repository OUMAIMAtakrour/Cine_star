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


    async addRating(filmId, ratingData) {
        try {
            return await Film.findOneAndUpdate(
                { _id: new mongoose.Types.ObjectId(filmId) },
                {
                    $push: { ratings: ratingData },
                    $inc: { totalRatings: 1 }
                },
                { new: true }
            );
        } catch (error) {
            throw new Error(`Error in DAO adding rating: ${error.message}`);
        }
    }

    async updateRating(filmId, userId, ratingData) {
        try {
            return await Film.findOneAndUpdate(
                { 
                    _id: new mongoose.Types.ObjectId(filmId),
                    'ratings.user_id': new mongoose.Types.ObjectId(userId)
                },
                {
                    $set: {
                        'ratings.$': {
                            ...ratingData,
                            user_id: new mongoose.Types.ObjectId(userId)
                        }
                    }
                },
                { new: true }
            );
        } catch (error) {
            throw new Error(`Error in DAO updating rating: ${error.message}`);
        }
    }

    async getFilmRatings(filmId) {
        try {
            return await Film.findOne(
                { _id: new mongoose.Types.ObjectId(filmId) },
                { ratings: 1, averageRating: 1, totalRatings: 1 }
            ).populate('ratings.user_id', 'name email');
        } catch (error) {
            throw new Error(`Error in DAO getting ratings: ${error.message}`);
        }
    }

    async updateAverageRating(filmId) {
        try {
            const film = await Film.findOne({ _id: new mongoose.Types.ObjectId(filmId) });
            if (!film || !film.ratings.length) {
                return film;
            }

            const totalScore = film.ratings.reduce((sum, rating) => sum + rating.score, 0);
            const averageRating = totalScore / film.ratings.length;

            return await Film.findOneAndUpdate(
                { _id: new mongoose.Types.ObjectId(filmId) },
                { 
                    $set: { 
                        averageRating,
                        totalRatings: film.ratings.length
                    }
                },
                { new: true }
            );
        } catch (error) {
            throw new Error(`Error in DAO updating average rating: ${error.message}`);
        }
    }

    async deleteRating(filmId, userId) {
        try {
            return await Film.findOneAndUpdate(
                { _id: new mongoose.Types.ObjectId(filmId) },
                {
                    $pull: { ratings: { user_id: new mongoose.Types.ObjectId(userId) } },
                    $inc: { totalRatings: -1 }
                },
                { new: true }
            );
        } catch (error) {
            throw new Error(`Error in DAO deleting rating: ${error.message}`);
        }
    }
}


module.exports = FilmDao;
