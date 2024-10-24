const FilmService = require("../services/filmService");
const MinioService = require("../services/minioService");
const filmRepository = require("../repositories/implementations/filmRepository");
const fs = require("fs");
const path = require("path");

class FilmController {
  constructor(filmService) {
    this.filmService = filmService;
  }

  async show(req, res) {
    try {
      const film = await this.filmService.show(req);
      if (!film) {
        return res.status(404).json({ message: "Film not found" });
      }
      return res.status(200).json(film);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
  async store(req, res) {
    console.log("Request Body:", req.body);
    console.log("Request Files:", req.files);
    console.log("User Object:", req.user);

    try {
      const film = await this.filmService.store(req);

      res.status(201).json({
        message: "Film created successfully",
        film,
      });
    } catch (error) {
      console.error("Error in FilmController.store:", error);
      res.status(400).json({ message: error.message });
    }
  }

  async destroy(req, res) {
    try {
      const film = await this.filmService.destroy(req);
      return res.json({ message: "Film deleted successfully" });
    } catch (error) {
      return res.json({ error: error.message });
    }
  }

  async index(req, res) {
    try {
      const films = await this.filmService.index();

      const filmsWithUrls = await Promise.all(
        films.map(async (film) => {
          const imageUrl = await MinioService.getFileUrl(film.image_);
          const videoUrl = await MinioService.getFileUrl(film.video);
          return {
            ...film._doc,
            imageUrl,
            videoUrl,
          };
        })
      );

      res.json(filmsWithUrls);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const updatedFilm = await this.filmService.update(req);
      return res.json(updatedFilm);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async getFilmWithSessions(req, res) {
    try {
      const film = await this.filmService.getFilmWithSessions(req);

      if (!film) {
        return res.status(404).json({
          message: "Film not found",
        });
      }

      return res.status(200).json(film);
    } catch (error) {
      if (error.message.includes("Film ID is required")) {
        return res.status(400).json({
          error: "Film ID is required",
        });
      }

      if (error.message.includes("Invalid date format")) {
        return res.status(400).json({
          error: "Invalid date format in query parameters",
        });
      }

      return res.status(500).json({
        error: `Error fetching film with sessions: ${error.message}`,
      });
    }
  }
  async getAllFilms(req, res) {
    try {
      const films = await this.filmService.getAllFilms();

      const filmsWithUrls = await Promise.all(
        films.map(async (film) => {
          let imageUrl = null;
          let videoUrl = null;
          try {
            if (film.image) {
              imageUrl = await MinioService.getFileUrl(film.image);
            }
            if (film.video) {
              videoUrl = await MinioService.getFileUrl(film.video);
            }
          } catch (error) {
            console.error(`Error getting URL for film ${film._id}:`, error);
          }
          return {
            ...film,
            imageUrl,
            videoUrl,
          };
        })
      );

      res.status(200).json(filmsWithUrls);
    } catch (error) {
      console.error("Error in FilmController.getAllFilms:", error);
      res
        .status(500)
        .json({ message: "An error occurred while fetching films" });
    }
  }

  async addRating(req, res) {
    try {
      const { filmId } = req.params;
      const { score, comment } = req.body;
      const userId = req.user._id;

      if (!score || score < 1 || score > 5) {
        return res.status(400).json({
          error: "Invalid rating score. Must be between 1 and 5.",
        });
      }

      const film = await this.filmService.addRating(
        filmId,
        userId,
        score,
        comment
      );

      return res.status(200).json({
        message: "Rating added successfully",
        averageRating: film.averageRating,
        totalRatings: film.totalRatings,
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async getFilmRatings(req, res) {
    try {
      const { filmId } = req.params;
      const ratings = await this.filmService.getFilmRatings(filmId);
      return res.status(200).json(ratings);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

const filmService = new FilmService();
const filmController = new FilmController(filmService);

module.exports = filmController;
