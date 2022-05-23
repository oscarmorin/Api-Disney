const { Schema, model  } = require('mongoose');

const GenreSchema = Schema({
    title: {
        type: String,
        required: [true, 'The name is required']
    },
    img: {
        type: String,
        required: [true, 'The picture is required']
    },
    movies: {
        type: Schema.Types.ObjectId,
        ref: 'MovieSerie'
    } 
});

module.exports = model( 'Genre', GenreSchema );