const FilmRepository = require("../repositories/implementations/filmRepository");
const Film = require('../models/film');
class FilmService {
  constructor() {
    this.filmRepository = new FilmRepository();
  }

  async store(filmData) {
    if (!filmData.name || !filmData.duration || !filmData.imagePath || !filmData.videoPath) {
      throw new Error("Missing required fields: name, duration, image, or video");
    }

    const film = new Film({
      name: filmData.name,
      duration: filmData.duration,
      user_id: filmData.user_id, 
      image: filmData.imagePath, 
      video: filmData.videoPath,
    });

    try {
      const savedFilm = await this.filmRepository.store(film); 
      return savedFilm;
    } catch (error) {
      throw new Error("Failed to store film: " + error.message);
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
}
module.exports = FilmService;