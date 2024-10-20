const FilmService = require("../services/filmService");
const MinioService = require("../services/minioService");
const filmRepository = require("../repositories/implementations/filmRepository");
const fs = require("fs");

class FilmController {
  constructor(filmService) {
    this.filmService = filmService;
    this.minioService = new MinioService();
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
    try {
      const { name, duration } = req.body;
      const imageFile = req.files.image[0];
      const videoFile = req.files.video[0];

      const imagePath = imageFile
        ? `http://127.0.0.1:9000/movies/posters/${imageFile.filename}`
        : undefined;
      const videoPath = videoFile
        ? `http://127.0.0.1:9000/movies/videos/${videoFile.filename}`
        : undefined;

      console.log("Extracted paths:", { imagePath, videoPath });

      const film = await filmRepository.store(
        { name, duration },
        undefined,
        imagePath,
        videoPath
      );

      res.status(201).json(film);
    } catch (error) {
      console.error("Error in FilmController.store:", error);
      res.status(500).json({ error: error.message });
    }
  }

  async destroy(req, res) {
    try {
      const film = await this.filmService.destroy(req);
      return res.status(200).json({ message: "Film deleted successfully" });
    } catch (error) {
      return res.status(400).json({ error: error.message });
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
      const film = await this.filmService.update(req);
      return res.json(film);
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
}

const filmService = new FilmService();
// const minioService = new MinioService();
const filmController = new FilmController(filmService);

module.exports = filmController;
