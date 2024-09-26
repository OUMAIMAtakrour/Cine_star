class Film {
    constructor(id, name, duration, adminId) {
        this.id = id;
        this.name = name;
        this.duration = duration;
        this.adminId = adminId;
      }

  getName() {
    return this.name;
  }

  getDuration() {
    return this.duration;
  }

  getAdminId() {
    return this.adminId;
  }

  getId() {
    return this.id;
  }
}
module.exports = Film;
