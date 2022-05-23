const { response, request } = require('express');

const MovieSerie = require('../models/movieSeries');
const Character = require('../models/character');

//ObtenerMovieSeries
const getMovieSeries = async (req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { status: true };

    const [ total, movieSeries ] = await Promise.all([
      MovieSerie.countDocuments(query),
      MovieSerie.find(query)
      .skip(Number( desde ))
      .limit(Number( limite ))

    ]);

    res.json({
       total,
       movieSeries
    });
  }

//CrearMovieSeries
const createMovieSeries = async (req = request , res = response) => {

    //Obtener datos del body
    const { ...body } = req.body;

    //Verificar si existe MovieSerie
    const movieSeriesDB = await MovieSerie.findOne({ title: req.body.title });

    if ( movieSeriesDB ) {
        return res.status(400).json({
            msg: `The movie or serie ${ movieSeriesDB.title } is already`
        });
    }

    let characterDB = await Character.findOne({ name: req.body.name})

    if ( !characterDB ) {

      //Crear Movieserie sin personaje relacionado
      movieSeries = new MovieSerie({ ...body });

    } else {

      //Crear Movieserie con personaje relacionado
      movieSeries = new MovieSerie({ 
        ...body,
        character: req.body.character
      });
    } 

    //Guardar en BD
    await movieSeries.save();

    res.json({
        movieSeries
    });
  }

//ActualizarMovieSeries
const putMovieSeries = async (req = request, res = response) => {

    const { id } = req.params;
    const { status, ... data } = req.body;

    data.title = data.title.toUpperCase();

    const movieSeries = await MovieSerie.findByIdAndUpdate( id, data, { new: true } );

    res.json(movieSeries);


}

//BorrarMovieSeries - status: False
const deleteMovieSeries = async (req = request, res = response) => {

    const { id } = req.params;

    //Cambiar estado de usuario
    const movieSeries = await MovieSerie.findByIdAndUpdate(id, {estado: false }, { new: true } );

    res.json(movieSeries);
    
}

  module.exports = {
    getMovieSeries,
    createMovieSeries,
    putMovieSeries,
    deleteMovieSeries
  }