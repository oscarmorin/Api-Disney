const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const sgMail = require('@sendgrid/mail');

const { User } = require('../models/index');

const createUser = async (req = request , res = response) => {

    const { name, mail, password, role } = req.body;
    const user = new User({ name, mail, password, role });

    //encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt );

    //Guardar en BD
    await user.save();

    //Enviar Email de Bienvenida 
    const msg = {
        to: 'prueba@gmail.com', // Change to your recipient
        from: 'prueba@gmail.com', // Change to your verified sender
        subject: 'Sending with SendGrid is Fun',
        text: 'and easy to do anywhere, even with Node.js',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    }

    //ObtenerApiKey
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

        sgMail
    .send(msg)
    .then((response) => {
        console.log(response[0].statusCode)
        console.log(response[0].headers)
    })
    .catch((error) => {
        console.error(error)
    })

    res.json({
        user,
        msg
    });
  }

  module.exports = {
      createUser
  }