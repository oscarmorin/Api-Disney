const { response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/index');
const { generateJWT } = require('../helpers/generateJWT');

const login = async ( req, res = response ) => {

    const { mail, password } = req.body;

    try {

        //Verificar si existe mail
        const user = await User.findOne({ mail });

        if ( !user ) {
            return res.status(400).json({
                msg: ' User / Password not valid - mail '
            })
        } 

        //si el usuario esta activo
        if ( !user.status ) {
            return res.status(400).json({
                msg: 'User / Password not valid - status: Disabled'
            })
        }

        //verificar la contraseña 
        const validPassword = bcryptjs.compareSync( password, user.password );
        if ( !validPassword ) {
            return res.status(400).json({
                msg: 'User / Password not valid - Password'
            })
        }

        //generar JWT
        const token = await generateJWT ( user.id );

        res.json ({
            user,
            token
        })
        
    } catch (error) {

        console.log(error)
        return res.status(500).json ({
            msg: 'Communicate to administrator'
        })
        
    }
}

module.exports = {
    login
}