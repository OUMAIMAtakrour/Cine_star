const FilmRepository = require("../repositories/implementations/filmRepository");
class FilmService {
  constructor() {
    this.filmRepository = new FilmRepository();
  }

  store(filmFields, user_id, image) {
    return this.filmRepository.store(filmFields, user_id, image);
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
