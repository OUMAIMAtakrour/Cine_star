
const FilmService = require("../services/filmService");

class FilmController {
    constructor(filmService) {
        this.filmService = filmService;
    }

    async store(req, res) {
        try {
            const film = await this.filmService.store(req);
            res.status(201).json(film);
        } catch (error) {
            res.status(400).json({ error: error.message });
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
            return res.json(films);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
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

    async update(req, res) {
        try {
            const film = await this.filmService.update(req);
            return res.json(film);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}

const filmService = new FilmService();

const filmController = new FilmController(filmService);

module.exports = filmController;