const { Schema, model  } = require('mongoose');

const GenreSchema = Schema({
    name: {
        type: String,
        required: [true, 'The name is required']
    },
    img: {
        type: String,
        required: [true, 'The picture is required']
    }
});

module.exports = model( 'Genre', GenreSchema );