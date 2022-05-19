const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');

const createUser = async (req = request , res = response) => {

    const { name, mail, password, role } = req.body;
    const user = new User({ name, mail, password, role });

    //encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt );

    //Guardar en BD
    await user.save();

    res.json({
        user
    });
  }

  module.exports = {
      createUser
  }