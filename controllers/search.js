const { response } = require('express');
const { ObjectId } = require('mongoose').Types;
const Character = require('../models/character');
const MovieSerie = require('../models/movieSeries');
const coleccionesPermitidas = [
    'character',
    'movies'
];

const searchCharacter = async( termino ='', res = response ) => {

    const esMongoID = ObjectId.isValid( termino ); //True

    //Verificar y buscar por mongoID 
    if ( esMongoID ) {

        //Buscar personaje asociado a mongoID
        let character = await Character.findById(termino).populate('movies','title');

        //Si es un mongoID pero no encuentra personaje, posiblemente este buscando personaje por pelicula
        if (!character) {
            character = await Character.find({movies: termino}).populate('movies','title');
        }
        return res.json({
            results: ( character ) ? [ character ] : []
        });
    }

    //Validar termino para poder buscar por edad
    if (Number(termino)){
        number= termino
    } else {
        number = 0;
    }

    //Expresión regular para buscar por nombre
    const regex = new RegExp( termino, 'i');

    //Buscar Personaje
    const character = await Character.find({ 
        $or: [{name: regex, estado: true }, { age: number, estado: true}]})
        .populate('movies','title');

    res.json({
        results: character
    });

}

const searchMovies = async( termino ='', res = response ) => {

    const esMongoID = ObjectId.isValid( termino ); //True

    if ( esMongoID ) {

        //Buscar pelicula asociado a mongoID
        let movies = await MovieSerie.findById(termino).populate('character','name');

        //Si es un mongoID pero no encuentra la pelicula, posiblemente este buscando pelicula por genero

        if( !movies ) {
             movies = await MovieSerie.find({genre: termino});
        }

        return res.json({
            results: ( movies ) ? [ movies ] : []
        });
    }

    //Expresión regular para buscar por nombre
    const regex = new RegExp( termino, 'i');

    //Buscar Pelicula
    const movies = await MovieSerie.find({ 
        $or: [ { title: regex, estado: true }
            //, { title: regex, estado: true }
        ] 
    }).populate('character','name');

    res.json({
        results: movies
    });

}

//Busqueda
const search = ( req, res = response ) => {

    const {coleccion, termino } = req.params;

    if( !coleccionesPermitidas.includes( coleccion ) ) {
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${ coleccionesPermitidas }`
        });
    }

    switch (coleccion) {
        case 'character':
        
        searchCharacter(termino, res);
          
        break;
        
        case 'movies':

        searchMovies(termino, res);
            
        break;
  
        default:
            res.status(500).json({
                msg: 'Se le olvido hacer esta búsqueda'
            });
    }
}

module.exports = {
    search
}