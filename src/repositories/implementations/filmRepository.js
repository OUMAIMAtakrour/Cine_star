const FilmInterface = require("./../../repositories/interfaces/filmInterface");
const FilmModel = require("./../../models/film");
const FilmDao = require("./../../dao/filmDao");

class FilmRepository extends FilmInterface {
  constructor() {
    super();
    this.filmDao = new FilmDao();
  }

  index() {
    return this.filmDao.index();
  }

  async store(filmFields, user_id, image) {
    const { name, duration } = filmFields;
    const _image = image;

    const _user_id = user_id;

    new FilmModel(name, duration, _user_id, _image);

    const film = {
      name: name,
      duration: duration,
      user_id: _user_id,
      image_path: _image,
    };

    return await this.filmDao.save(film);
  }

  async destroy(req) {
    const { id } = req.params;
    if (!id) {
      throw new Error("Film ID is required");
    }

    return await this.filmDao.delete(id);
  }

  show(req) {
    const { id } = req.params;
    if (!id) {
      throw new Error("Film ID is required");
    }

    return this.filmDao.show(id);
  }

  // async update(req) {
  //   const { id } = req.params;
  //   const { name, duration } = req.body;
  //   const admin_id = req.user.adminData._id;

  //   if (!id) {
  //     throw new Error("Film ID is required");
  //   }

  //   if (!admin_id) {
  //     throw new Error("Admin ID is required");
  //   }

  //   const filmData = { name, duration, admin_id };

  //   return await this.filmDao.update(id, filmData);
  // }

  async getFilmWithSessions(req) {
    try {
      const { id } = req.params;
      const { date, startTime, endTime } = req.query;

      if (!id) {
        throw new Error("Film ID is required");
      }

      const filter = {};

      if (date) {
        const filterDate = new Date(date);
        filterDate.setHours(0, 0, 0, 0);
        filter.date = filterDate;
      }

      if (startTime && endTime) {
        filter.hour = {
          $gte: startTime,
          $lte: endTime,
        };
      }

      const film = await this.filmDao.getFilmWithSessions(id, filter);

      if (!film) {
        throw new Error("Film not found");
      }

      return film;
    } catch (error) {
      throw new Error(`Error fetching film with sessions: ${error.message}`);
    }
  }
}

module.exports = FilmRepository;
