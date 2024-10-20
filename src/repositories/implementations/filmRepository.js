const FilmInterface = require("../interfaces/filmInterface");
const FilmModel = require("../../models/film");
const FilmDao = require("../../dao/filmDao");
const MinioService = require("../../services/minioService"); 

class FilmRepository extends FilmInterface {
  constructor() {
    super();
    this.filmDao = new FilmDao();
  }

  index() {
    return this.filmDao.index();
  }

  async store(req) {
    console.log('FilmRepository.store - Request Body:', req.body);
    console.log('FilmRepository.store - Request Files:', req.files);
    console.log('FilmRepository.store - User Object:', req.user);
  
    try {
      if (!req.body) {
        throw new Error('Request body is undefined');
      }
  
      const { name, duration } = req.body;
      const user_id = req.user?._id;
  
      if (!user_id) {
        throw new Error('Authentication required');
      }
  
      if (!name || !duration) {
        throw new Error('Missing required fields: name or duration');
      }
  
      const imageFile = req.files?.image?.[0];
      const videoFile = req.files?.video?.[0];
  
      if (!imageFile || !videoFile) {
        throw new Error('Missing required files: image or video');
      }
  
      const image = await MinioService.uploadFile(imageFile, 'movies');
      const video = await MinioService.uploadFile(videoFile, 'movies');
  
      const filmData = {
        name,
        duration: parseInt(duration),
        image,
        video,
        user_id,
      };
  
      const film = await this.filmDao.store(filmData);
      return film;
    } catch (error) {
      console.error('Error in FilmRepository.store:', error);
      throw new Error(`Error storing film: ${error.message}`);
    }
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

  async getMovie(req) {
    try {
      const { id } = req.params;

      if (!id) {
        throw new Error("Film ID is required");
      }

      const film = await this.filmDao.show(id);
      if (!film) {
        throw new Error("Film not found");
      }

      const videoUrl = await MinioService.getVideoUrl(film.video);

      return {
        ...film.toObject(),
        videoUrl,
      };
    } catch (error) {
      throw new Error(`Error retrieving film: ${error.message}`);
    }
  }
}

module.exports = FilmRepository;
