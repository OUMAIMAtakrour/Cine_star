class Film {
  constructor(id, name, duration, userId, image, video) {
    this.id = id;
    this.name = name;
    this.duration = duration;
    this.userId = userId;
    this.image = image;
    this.video = video;
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
}
module.exports = Film;
