const FilmRepository = require("../repositories/implementations/filmRepository");
class FilmService {
  constructor() {
    this.filmRepository = new FilmRepository();
  }

  async store(data) {
    return this.filmRepository.store(data);
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
