const { request, response } = require('express');
const { ObjectId } = require('mongoose').Types;

const { Character, MovieSerie} = require('../models/index');
const coleccionesPermitidas = [
    'character',
    'movies'
];

const searchCharacter = async( name = '' , age = '' , id = '', res = response ) => {

    //Validar si busca por id
    if ( id !== '' ) {

        const esMongoID = ObjectId.isValid( id ); //True

    //Verificar y buscar por mongoID 
        if ( esMongoID ) {

            //Buscar personaje asociado a mongoID
            let character = await Character.findById(id).populate('movies','title');

            //Si es un mongoID pero no encuentra personaje, posiblemente este buscando personaje por pelicula
            if (!character) {
                character = await Character.find({movies: id}).populate('movies','title');
            }
            return res.json({
                results: ( character ) ? [ character ] : []
            });
        } else {
            return res.json({
                    msg: 'The genre is not valid for the search'
            });
        }
    }

    //Expresión regular para buscar por nombre
    const regex = new RegExp( name, 'i');

    //Buscar Personaje por nombre
    let character = await Character.find( {name: regex, status: true })
        .populate('movies','title');


    if(age !== '') {
        
        const ageNumber = Number(age);

        //Buscar Personaje por edad
         character = await Character.find( {age: ageNumber, status: true })
        .populate('movies','title');
    }

    res.json({
        results: character
    });

}

const searchMovies = async( order= '', name ='', id = '', res = response ) => {

    //Validar si busca por id
    if ( id !== ''){
        
        const esMongoID = ObjectId.isValid( id ); //True

        if ( esMongoID ) {

            //Buscar pelicula asociado a mongoID
            let movies = await MovieSerie.findById(id).populate('character','name');

            //Si es un mongoID pero no encuentra la pelicula, posiblemente este buscando pelicula por genero

            if( !movies ) {
                movies = await MovieSerie.find({genre: id});
            }

            return res.json({
                results: ( movies ) ? [ movies ] : []
            });
        } else {
            return res.json({
                    msg: 'The genre is not valid for the search'
            });
        }

    } 

    //Expresión regular para buscar por nombre
    const regex = new RegExp( name, 'i');
    console.log(regex);

    //Buscar Pelicula
    let movies = await MovieSerie.find( { title: regex, status: true }).populate('character','name');  

    //Si busca por orden 
    if( order == 'desc'){

        //Ordenar descendente 
        movies.sort((a,b) => { return b.premiere - a.premiere });
        

    } else if (order == 'asc'){

        //Ordenar ascendente
        movies.sort((a,b) => { return a.premiere - b.premiere });

    } 

    res.json({
        results: movies
    });
    
}

//Busqueda
const search = ( req = request , res = response ) => {

    const { coleccion } = req.params;
    const { name, age, id, order } = req.query;

    if( !coleccionesPermitidas.includes( coleccion ) ) {
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${ coleccionesPermitidas }`
        });
    }

    switch (coleccion) {
        case 'character':
        
        searchCharacter( name , age, id, res );
          
        break;
        
        case 'movies':

        searchMovies( order, name, id, res );
            
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