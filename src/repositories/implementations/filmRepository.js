const FilmInterface = require("../interfaces/filmInterface");
const FilmModel = require("../../models/film");
const FilmDao = require("../../dao/filmDao");
const MinioService = require("../../services/minioService");
const Film = require("../../models/film");

class FilmRepository extends FilmInterface {
  constructor() {
    super();
    this.filmDao = new FilmDao();
    this.bucketName = "movies";
  }

  index() {
    return this.filmDao.index();
  }

  async store(req) {
    console.log("FilmRepository.store - Request Body:", req.body);
    console.log("FilmRepository.store - Request Files:", req.files);
    console.log("FilmRepository.store - User Object:", req.user);

    try {
      if (!req.body) {
        throw new Error("Request body is undefined");
      }

      const { name, duration } = req.body;
      const user_id = req.user?._id;

      if (!user_id) {
        throw new Error("Authentication required");
      }

      if (!name || !duration) {
        throw new Error("Missing required fields: name or duration");
      }

      const imageFile = req.files?.image?.[0];
      const videoFile = req.files?.video?.[0];

      if (!imageFile || !videoFile) {
        throw new Error("Missing required files: image or video");
      }

      const image = await MinioService.uploadFile(imageFile, "movies");
      const video = await MinioService.uploadFile(videoFile, "movies");

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
      console.error("Error in FilmRepository.store:", error);
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
  async getAllFilms() {
    try {
      const films = await this.filmDao.index();

      const filmsWithUrls = await Promise.all(
        films.map(async (film) => {
          let imageUrl = null;
          let videoUrl = null;

          try {
            if (film.image) {
              imageUrl = await MinioService.getFileUrl(
                film.image,
                this.bucketName
              );
            }
          } catch (error) {
            console.error(
              `Error getting image URL for film ${film._id}:`,
              error
            );
          }

          try {
            if (film.video) {
              videoUrl = await MinioService.getFileUrl(
                film.video,
                this.bucketName
              );
            }
          } catch (error) {
            console.error(
              `Error getting video URL for film ${film._id}:`,
              error
            );
          }

          return {
            ...film.toObject(),
            image: imageUrl || film.image,
            video: videoUrl || film.video,
            imageUrl,
            videoUrl,
          };
        })
      );

      return filmsWithUrls;
    } catch (error) {
      console.error("Error in FilmRepository.getAllFilms:", error);
      throw new Error(`Error fetching all films: ${error.message}`);
    }
  }

  // async getAllMovies(req) {
  //   try {
  //     const { id } = req.params;

  //     if (!id) {
  //       throw new Error("Film ID is required");
  //     }

  //     const film = await this.filmDao.show(id);
  //     if (!film) {
  //       throw new Error("Film not found");
  //     }

  //     const videoUrl = await MinioService.getVideoUrl(film.video);

  //     return {
  //       ...film.toObject(),
  //       videoUrl,
  //     };
  //   } catch (error) {
  //     throw new Error(`Error retrieving film: ${error.message}`);
  //   }
  // }
  async addRating(filmId, userId, score, comment) {
    try {
      const ratingData = {
        user_id: userId,
        score,
        comment,
        createdAt: new Date(),
      };

      const film = await this.filmDao.show(filmId);
      if (!film) {
        throw new Error("Film not found");
      }

      const existingRating = film.ratings?.find(
        (rating) => rating.user_id.toString() === userId.toString()
      );

      let updatedFilm;
      if (existingRating) {
        updatedFilm = await this.filmDao.updateRating(
          filmId,
          userId,
          ratingData
        );
      } else {
        updatedFilm = await this.filmDao.addRating(filmId, ratingData);
      }

      return await this.filmDao.updateAverageRating(filmId);
    } catch (error) {
      throw new Error(`Error adding rating: ${error.message}`);
    }
  }

  async getFilmRatings(filmId) {
    try {
      const film = await this.filmDao.getFilmRatings(filmId);
      if (!film) {
        throw new Error("Film not found");
      }

      return {
        filmId: film._id,
        averageRating: film.averageRating,
        totalRatings: film.totalRatings,
        ratings: film.ratings,
      };
    } catch (error) {
      throw new Error(`Error getting film ratings: ${error.message}`);
    }
  }

  async deleteRating(filmId, userId) {
    try {
      const film = await this.filmDao.deleteRating(filmId, userId);
      if (!film) {
        throw new Error("Film or rating not found");
      }

      return await this.filmDao.updateAverageRating(filmId);
    } catch (error) {
      throw new Error(`Error deleting rating: ${error.message}`);
    }
  }
  async update(req) {
    const { id } = req.params; 
    const { name, duration } = req.body;
    const userId = req.user._id;
  
    if (!id) {
      throw new Error("Film ID is required");
    }
  
    try {
      const existingFilm = await this.filmDao.show(id); 
      if (!existingFilm) {
        throw new Error("Film not found");
      }
  
      const updateData = {}; 
  
      if (name) {
        updateData.name = name;
      }
      if (duration) {
        updateData.duration = parseInt(duration);
      }
  
      if (req.files?.image?.[0]) {
        const imageFile = req.files.image[0];
        const image = await MinioService.uploadFile(imageFile, this.bucketName);
        updateData.image = image;
      }
      
      if (req.files?.video?.[0]) {
        const videoFile = req.files.video[0];
        const video = await MinioService.uploadFile(videoFile, this.bucketName);
        updateData.video = video;
      }
  
      const updatedFilm = await this.filmDao.update(id, updateData);
  
      if (updatedFilm.modifiedCount === 0) {
        return existingFilm;
      }
  
      return updatedFilm;
    } catch (error) {
      console.error("Error in FilmRepository.update:", error);
      throw new Error(`Error updating film: ${error.message}`);
    }
  }
  
  
}

module.exports = FilmRepository;
