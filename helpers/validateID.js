
const Character = require('../models/character');

//Validar id de categorias
const validarId = async ( id ) => {

    const existeCategoriaId = await Categoria.findById(id);

    if ( !existeCategoriaId ) {
        throw new Error (`El ID: ${ id } no esta asociado a ninguna categoría`);
    }

}

//Validar id de productos
const validateCharacterId = async ( id ) => {

    const existsCharacterId = await Character.findById(id);

    if ( !existsCharacterId ) {
        throw new Error (`The ID: ${ id } is not valid`);
    }

}

const validateMovieSeriesId = async () => {

}

module.exports = { 
    validarId, 
    validateCharacterId,
    validateMovieSeriesId 
};