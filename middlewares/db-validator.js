const  Role  = require('../models/role');
const User = require('../models/user');

const roleExists = async(role = '') => {
    const roleExists = await Role.findOne({ role });
    if ( !roleExists) {
      throw new Error(`This role ${ role } is not valid`)
    }
}

//verificar si el correo existe
const mailExists = async ( mail = '' ) => {
    const mailExists = await User.findOne({ mail });

    if ( mailExists) {
        throw new Error (`This mail: ${mail} is already registered`)      
    }
}

//verificar si el usuario existe por id
const existeUsuarioPorId = async ( id ) => {
    
    const existeUsuario = await Usuario.findById(id);

    if ( !existeUsuario ) {
        throw new Error (`El ID: ${ id } no existe`)
    }
}

module.exports = {
    roleExists,
    mailExists,
    existeUsuarioPorId
}