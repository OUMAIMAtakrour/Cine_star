const CommentRepository = require("../repositories/implementations/commentRepository");

class CommentService {
  constructor() {
    this.commentRepository = new CommentRepository();
  }

  async store(req) {
    return this.commentRepository.store(req);
  }

  destroy(req) {
    return this.commentRepository.destroy(req);
  }

  index() {
    return this.commentRepository.index();
  }

  show(req) {
    return this.commentRepository.show(req);
  }

  update(req) {
    return this.commentRepository.update(req);
  }
  async getCommentsByMovieId(movieId) {
    return this.commentRepository.getCommentsByMovieId(movieId); 
  }
}

module.exports = CommentService;
