class Film {
  constructor(id, name, duration, userId, image_path) {
    this.id = id;
    this.name = name;
    this.duration = duration;
    this.userId = userId;
    this.image_path = image_path;
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
    return this.image_path;
  }
}
module.exports = Film;
