class FilmInterface{
    constructor(){
        if(new.target === FilmInterface){
            throw new Error('It is an abstract class can not be instancited');
        }

    }


    store(filmFields, user_id, image){
        throw new Error('Must be Implemented!!');
    }

    destroy(req){
        throw new Error('Must be Implemented!!');
    }

    index(){
        throw new Error('Must be Implemented!!');
    }

    show(req){
        throw new Error('Must be Implemented!!');
    }

    update(req){
        throw new Error('Must be Implemented!!');
    }
    getFilmWithSessions(req) {
        throw new Error('Must be Implemented!!');
    }
    addRating(filmId, userId, score, comment) {
        throw new Error('Must be Implemented!!');
    }

    getFilmRatings(filmId) {
        throw new Error('Must be Implemented!!');
    }

    updateRating(filmId, userId, score, comment) {
        throw new Error('Must be Implemented!!');
    }

    deleteRating(filmId, userId) {
        throw new Error('Must be Implemented!!');
    }

    getUserFilmRating(filmId, userId) {
        throw new Error('Must be Implemented!!');
    }
}
module.exports = FilmInterface;
