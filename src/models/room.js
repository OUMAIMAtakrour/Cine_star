class Room {
    constructor(id, name, capacity, adminId) {
      this.id = id;
      this.name = name;
      this.capacity = capacity;
      this.adminId = adminId;
    }
  
    getId() {
      return this.id;
    }
  
    getName() {
      return this.name;
    }
  
    getCapacity() {
      return this.capacity;
    }
  
    getAdminId() {
      return this.adminId;
    }
  }
  
  module.exports = Room;