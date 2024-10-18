const CommentInterface = require("../../repositories/interfaces/commentInterface");
const CommentModel = require("../../models/Comment");
const CommentDao = require("../../dao/commentDao");

class CommentRepository extends CommentInterface {
  constructor() {
    super();
    this.commentDao = new CommentDao();
  }

  index() {
    return this.commentDao.index();
  }

  async store(commentData) {
    const { movieId, content } = commentData.body;
    
    if (!commentData.user || !commentData.user._id) {
        throw new Error("Admin not authenticated or admin data missing");
      }
      const userId = commentData.user._id;
    const createdAt = new Date();

    const commentObj = new CommentModel(
      null,
      movieId,
      userId,
      content,
      createdAt
    );

    const comment = {
      movieId: commentObj.getMovieId(),
      userId: commentObj.getUserId(),
      content: commentObj.getContent(),
      createdAt: commentObj.getCreatedAt(),
    };

    return await this.commentDao.save(comment);
  }

  async destroy(req) {
    const { id } = req.params;
    if (!id) {
      throw new Error("Comment ID is required");
    }

    return await this.commentDao.delete(id);
  }

  show(req) {
    const { id } = req.params;
    if (!id) {
      throw new Error("Comment ID is required");
    }

    return this.commentDao.show(id);
  }

  async update(req) {
    const { id } = req.params;
    const { content } = req.body;

    if (!id) {
      throw new Error("Comment ID is required");
    }

    const commentData = {
      content: content,
    };

    return await this.commentDao.update(id, commentData);
  }


  async getCommentsByMovieId(movieId) {
    return this.commentDao.getCommentsByMovieId(movieId); // Delegating to DAO
  }
}

module.exports = CommentRepository;
