const CommentService = require("../services/commentService");

class CommentController {
  constructor(commentService) {
    this.commentService = commentService;
  }

  async store(req, res) {
    try {
      const comment = await this.commentService.store(req);
      res.status(201).json(comment);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async destroy(req, res) {
    try {
      await this.commentService.destroy(req);
      return res
        .status(200)
        .json({ message: "Comment deleted successfully" });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async index(req, res) {
    try {
      const comments = await this.commentService.index();
      return res.json(comments);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async show(req, res) {
    try {
      const comment = await this.commentService.show(req);
      if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
      }
      return res.status(200).json(comment);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const comment = await this.commentService.update(req);
      return res.json(comment);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async getCommentsByMovieId(req, res) {
    try {
      const { movieId } = req.params;
      const comments = await this.commentService.getCommentsByMovieId(movieId); 
      if (!comments || comments.length === 0) {
        return res.status(404).json({ message: 'No comments found for this movie.' });
      }
      return res.status(200).json(comments);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

const commentService = new CommentService();
const commentController = new CommentController(commentService);

module.exports = commentController;
