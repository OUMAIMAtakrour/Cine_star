const FilmRepository = require("../repositories/implementations/filmRepository");
const Film = require("../models/film");
class FilmService {
  constructor() {
    this.filmRepository = new FilmRepository();
  }

  async store(req) {
    try {
      return await this.filmRepository.store(req);
    } catch (error) {
      throw new Error(`Error in FilmService.store: ${error.message}`);
    }
  }
  destroy(req) {
    return this.filmRepository.destroy(req);
  }

  index() {
    return this.filmRepository.index();
  }

  show(req) {
    return this.filmRepository.show(req);
  }

  update(req) {
    return this.filmRepository.update(req);
  }
  async getFilmWithSessions(req) {
    return this.filmRepository.getFilmWithSessions(req);
  }
  async getAllFilms() {
    return this.filmRepository.getAllFilms();
  }
  async addRating(filmId, userId, score, comment) {
    try {
        return await this.filmRepository.addRating(filmId, userId, score, comment);
    } catch (error) {
        throw new Error(`Error in FilmService.addRating: ${error.message}`);
    }
}

async getFilmRatings(filmId) {
    try {
        return await this.filmRepository.getFilmRatings(filmId);
    } catch (error) {
        throw new Error(`Error in FilmService.getFilmRatings: ${error.message}`);
    }
}
}
module.exports = FilmService;
