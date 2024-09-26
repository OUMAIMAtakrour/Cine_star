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

  async store(req) {
    const { name, duration } = req.body;
    
    if (!req.user || !req.user.adminData || !req.user.adminData._id) {
      throw new Error("Admin not authenticated or admin data missing");
    }
    
    const admin_id = req.user.adminData._id;

    const filmObj = new FilmModel(null, name, duration, admin_id);

    const film = {
      name: filmObj.getName(),
      duration: filmObj.getDuration(),
      admin_id: filmObj.getAdminId(),
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

  async update(req) {
    const { id } = req.params;
    const { name, duration } = req.body;
    const admin_id = req.user.adminData._id; 

    if (!id) {
      throw new Error("Film ID is required");
    }

    if (!admin_id) {
      throw new Error("Admin ID is required");
    }

    const filmData = { name, duration, admin_id };

    return await this.filmDao.update(id, filmData);
  }
}

module.exports = FilmRepository;
