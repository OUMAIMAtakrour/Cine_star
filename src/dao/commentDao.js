const Comment = require("../schema/commentSchema");
const mongoose = require("mongoose");

class CommentDao {
  save(comment) {
    return Comment.create(comment);
  }

  delete(id) {
    return Comment.deleteOne({ _id: id });
  }

  index() {
    return Comment.find();
  }

  show(id) {
    return Comment.findOne({ _id: id });
  }

  update(id, commentData) {
    return Comment.updateOne(
      { _id: new mongoose.Types.ObjectId(id) },
      { $set: commentData }
    );
  }

  async getCommentsByMovieId(movieId) {
    try {
      return await Comment.find({ movieId }); // Fetch comments by movieId
    } catch (error) {
      throw new Error(`Error fetching comments: ${error.message}`);
    }
  }
}

module.exports = CommentDao;
