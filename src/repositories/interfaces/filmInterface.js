class FilmInterface{
    constructor(){
        if(new.target === FilmInterface){
            throw new Error('It is an abstract class can not be instancited');
        }

    }


    store(req){
        throw new Error('Must be Implemented!!');
    }

    destroy(req){
        throw new Error('Must be Implemented!!');
    }

    index(){
        throw new Error('Must be Implemented!!');
    }

    show(req){
        throw new Error('Must be Implemented!!');
    }

    update(req){
        throw new Error('Must be Implemented!!');
    }
}
module.exports = FilmInterface;
