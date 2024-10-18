class CommentInterface {
    constructor() {
      if (new.target === CommentInterface) {
        throw new Error('CommentInterface is an abstract class and cannot be instantiated directly');
      }
    }
  
    store(req) {
      throw new Error('store method must be implemented');
    }
  
    destroy(req) {
      throw new Error('destroy method must be implemented');
    }
  
    index() {
      throw new Error('index method must be implemented');
    }
  
    show(req) {
      throw new Error('show method must be implemented');
    }
  
    update(req) {
      throw new Error('update method must be implemented');
    }
  }
  
  module.exports = CommentInterface;
  