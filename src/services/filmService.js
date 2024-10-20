const FilmRepository = require("../repositories/implementations/filmRepository");
const Film = require("../models/film");
class FilmService {
  constructor() {
    this.filmRepository = new FilmRepository();
  }

  async store(filmData) {
    const { user_id, imagePath, videoPath, ...filmFields } = filmData;

      return await this.filmRepository.store(filmFields, user_id, imagePath, videoPath);
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
}
module.exports = FilmService;
