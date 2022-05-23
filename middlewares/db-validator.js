const { User, Role } = require('../models/index');

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

module.exports = {
    roleExists,
    mailExists,
}