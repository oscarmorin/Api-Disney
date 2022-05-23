const { response, request } = require('express');

const { Genre, MovieSerie} = require('../models/index');

//ObtenerGenero
const getGenre= async (req = request , res = response) => {


}
//CrearGenero
const createGenre= async (req = request , res = response) => {

    //Obtener datos del body
    const { ...body } = req.body;

    //Verificar si existe genero 
    const genreDB = await Genre.findOne({ title: req.body.title });

    if ( genreDB ) {
        return res.status(400).json({
            msg: `The genre ${ genreDB.title } is already`
        });
    }

    //Verificar si existe pelicula asociada al genero
    let movieSerieDB = await MovieSerie.findOne({ title: req.body.title})

    if ( !movieSerieDB ) {

      //Crear genero sin pelicula relacionada
      genre = new Genre({ ...body });

    } else {

      //Crear genero con pelicula relacionada
      genre = new Genre({ 
        ...body,
        movies: req.body.title
      });
    } 

    //Guardar en BD
    await genre.save();

    res.json({
        genre
    });
}

//ActualizarGenero
const putGenre= async (req = request , res = response) => {


}

//EliminarGenero
const deleteGenre= async (req = request , res = response) => {


}

module.exports = {
    getGenre,
    createGenre,
    putGenre,
    deleteGenre
}