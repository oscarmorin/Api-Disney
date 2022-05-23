
const { Character, MovieSerie, Genre} = require('../models/index');

//Validar id personaje
const validateIdCharacter = async ( id ) => {

    if ( id !== '' ){
        const existCharacter = await Character.findById(id);

        if ( !existCharacter) {
            throw new Error (`The ID( Character ): ${ id } not exist`)
        }    
    }  
}

//Validar id pelicula
const validateIdMovies = async ( id = '') => {

    if ( id !== '' ){

        const existMovie = await MovieSerie.findById(id);

        if ( !existMovie ) {
            throw new Error (`The ID( Movie ): ${ id } not exist`)
        }
    }   
}

//Validar id genero
const validateIdGenre = async ( id ) => {

    if ( id !== '' ){

        const existGenre = await Genre.findById(id);

        if ( !existGenre ) {
            throw new Error (`The ID( Genre ): ${ id } not exist`)
        }   
    } 
}

module.exports = { 
    validateIdMovies,
    validateIdCharacter,
    validateIdGenre
};