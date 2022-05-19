const { Schema, model  } = require('mongoose');

const UserSchema = Schema({
    name: {
        type: String,
        required: [true, 'The name is required']
    },
    mail: {
        type: String,
        required: [true, 'The mail is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'The password is required']
    },
    img: {
        type: String
    },
    role: {
        type: String,
        required: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    status: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }

});

module.exports = model( 'User', UserSchema );