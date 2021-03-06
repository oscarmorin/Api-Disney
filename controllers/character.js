const { response, request } = require('express');

const { Character, MovieSerie} = require('../models/index');

//ObtenerListaPersonaje
const getListCharacter = async (req = request, res = response) => {

  const { limite = 5, desde = 0 } = req.query;
  const query = { status: true };

  const [ total, character ] = await Promise.all([
    Character.countDocuments(query),
    Character.find(query)
    .skip(Number( desde ))
    .limit(Number( limite ))

  ]);

    let data = [];

    character.forEach(e => {

        data.push({
          name: e.name,
          img: e.img
        });
    
    });

  res.json({
     total,
     data
  });
}

//ObtenerPersonajeFull
const getCharacter = async (req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { status: true };

    const [ total, character ] = await Promise.all([
      Character.countDocuments(query),
      Character.find(query)
      .skip(Number( desde ))
      .limit(Number( limite ))

    ]);

    res.json({
       total,
       character
    });
  }

//CrearPersonaje
const createCharacter = async (req = request , res = response) => {

    //Obtener datos del body
    const { ...body } = req.body;

    //Verificar si existe el personaje
    const characterDB = await Character.findOne({ name: req.body.name });

    if ( characterDB ) {
        return res.status(400).json({
            msg: `The character ${ characterDB.name } is already`
        });
    }

    let moviesDB = await MovieSerie.findOne({ title: req.body.movies});

    if (!moviesDB) {

      //Crear el personaje sin pelicula relacionada
       character = new Character({ ...body });

    } else {

      //Crear el personaje con pelicula relacionada
      character = new Character({ 
          ...body,
          movies: moviesDB._id
      });

    } 

    //Guardar en BD
    await character.save();

    res.json({
        character
    });
  }

//ActualizarPersonaje
const putCharacter = async (req = request, res = response) => {

    const { id } = req.params;
    const { status, ... data } = req.body;

    data.name = data.name.toUpperCase();

    const character = await Character.findByIdAndUpdate( id, data, { new: true } );

    res.json(character);


}

//BorrarPersonaje - status: False
const deleteCharacter = async (req = request, res = response) => {

    const { id } = req.params;

    //Cambiar estado de personaje
    const character = await Character.findByIdAndUpdate(id, {estado: false }, { new: true } );

    res.json(character);
    
}

  module.exports = {
    getCharacter,
    getListCharacter,
    createCharacter,
    putCharacter,
    deleteCharacter
  }