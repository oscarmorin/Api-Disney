const { response } = require('express');

const adminRole = ( req , res = response, next ) => {

    if ( !req.user ) {
        return res.status(500).json({
            msg: 'You need the token before'
        })
    }

    const { role, name } = req.user;

    if ( role !== 'ADMIN_ROLE' ) {
        return res.status(401).json({
            msg: `${ name } not is administrator`
        })
    }

    next();
}

const roleExists = ( ...roles ) => {

    return ( req , res = response, next ) => {
       
        if ( !req.user ) {
            return res.status(500).json({
                msg: 'Se quiere verificar el role sin validar el token primero'
            })
        }

        if ( !roles.includes( req.user.role ) ) {
            return res.status(500).json({
                msg: `Only required this roles ${ roles }`
            })
        }
        
        
        next();
    }

}

module.exports = {
    adminRole,
    roleExists
}