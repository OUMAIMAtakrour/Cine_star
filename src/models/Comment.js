class Comment {
    constructor(id, movieId, userId, content, createdAt) {
      this.id = id;
      this.movieId = movieId;
      this.userId = userId;
      this.content = content;
      this.createdAt = createdAt;
    }
  
    getId() {
      return this.id;
    }
  
    getMovieId() {
      return this.movieId;
    }
  
    getUserId() {
      return this.userId;
    }
  
    getContent() {
      return this.content;
    }
  
    getCreatedAt() {
      return this.createdAt;
    }
  }
  
  module.exports = Comment;
  