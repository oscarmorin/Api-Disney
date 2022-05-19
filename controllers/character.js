const { response, request } = require('express');

const Character = require('../models/character');

//ObtenerProducto
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

//CrearProducto
const createCharacter = async (req = request , res = response) => {

    //Obtener datos del body
    const { img, name, age, weight, history  } = req.body;

    //Verificar si existe el personaje
    const characterDB = await Character.findOne({ name: req.body.name });

    if ( characterDB ) {
        return res.status(400).json({
            msg: `The character ${ characterDB.name } is already`
        });
    }

    //Crear el personaje
    const character = new Character({ img, name, age, weight, history });

    //Guardar en BD
    await character.save();

    res.json({
        character
    });
  }

//ActualizarProducto
const putCharacter = async (req = request, res = response) => {

    const { id } = req.params;
    const { status, ... data } = req.body;

    data.name = data.name.toUpperCase();

    const character = await Character.findByIdAndUpdate( id, data, { new: true } );

    res.json(character);


}

//BorrarProducto - status: False
const deleteCharacter = async (req = request, res = response) => {

    const { id } = req.params;

    //Cambiar estado de usuario
    const character = await Character.findByIdAndUpdate(id, {estado: false }, { new: true } );

    res.json(character);
    
}

  module.exports = {
    getCharacter,
    createCharacter,
    putCharacter,
    deleteCharacter
  }