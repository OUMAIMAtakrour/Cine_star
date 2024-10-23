class Film {
  constructor(id, name, duration, userId, image, video,ratings = [], averageRating = 0, totalRatings = 0) {
    this.id = id;
    this.name = name;
    this.duration = duration;
    this.userId = userId;
    this.image = image;
    this.video = video;
    this.ratings = ratings;
    this.averageRating = averageRating;
    this.totalRatings = totalRatings;
  }

  getName() {
    return this.name;
  }

  getDuration() {
    return this.duration;
  }

  getUserId() {
    return this.userId;
  }

  getId() {
    return this.id;
  }
  getImage() {
    return this.image;
  }
  getVideo() {
    return this.video;
  }
  getRatings() {
    return this.ratings;
  }

  getAverageRating() {
    return this.averageRating;
  }

  getTotalRatings() {
    return this.totalRatings;
  }
}
module.exports = Film;
