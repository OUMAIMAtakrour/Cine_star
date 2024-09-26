const FilmRepository = require("../repositories/implementations/filmRepository");
class FilmService {
    constructor() {
        this.filmRepository = new FilmRepository();
      }
    
      async store(req) {
        return this.filmRepository.store(req);
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
}
module.exports = FilmService;
