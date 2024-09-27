class RoomInterface {
    constructor() {
        if (new.target === RoomInterface) {
            throw new Error('It is an abstract class and cannot be instantiated');
        }
    }

    store(req) {
        throw new Error('Must be Implemented!!');
    }

    destroy(req) {
        throw new Error('Must be Implemented!!');
    }

    index() {
        throw new Error('Must be Implemented!!');
    }

    show(req) {
        throw new Error('Must be Implemented!!');
    }

    update(req) {
        throw new Error('Must be Implemented!!');
    }
}

module.exports = RoomInterface;