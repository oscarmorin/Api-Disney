const { response } = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const validateJWT = async( req = request, res = response, next ) => {

    const token = req.header('x-token');

    if ( !token ){
        return res.status(401).json({
            msg: 'No hay token en la petición'
        })
    }

    try {

        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );

        //Leer el usuario que corresponde al uid
        const user = await User.findById( uid );

        if ( !user ) {
            return res.status(401).json({
                msg: 'Token not valid - User dont exists in DB'
            })
        }

        //Verificar si el uid tiene estado true
        if( !user.status ) {
            return res.status(401).json({
                msg: 'User disabled'
            })
        }
        
        req.user = user;

        next();
        
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'token not valid'
        })
        
    }   

}

module.exports = {
    validateJWT
}