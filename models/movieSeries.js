const { Schema, model  } = require('mongoose');

const MovieSeriesSchema = Schema({
    img: {
        type: String,
        required: [true, 'The picture is required']
    },
    title: {
        type: String,
        required: [true, 'The name is required']
    },
    premiere: {
        type: Number,
        required: [true, 'The age is required'],
    },
    score: {
        type: Number,
        required: [true, 'The age is required'],
    },
    character: {
        type: Schema.Types.ObjectId,
        ref: 'Character'
    },
    genre: {
        type: Schema.Types.ObjectId,
        ref: 'Genre'
    } 
});

module.exports = model( 'MovieSerie', MovieSeriesSchema );