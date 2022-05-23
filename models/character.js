const { Schema, model  } = require('mongoose');

const CharacterSchema = Schema({
    img: {
        type: String,
        required: [true, 'The picture is required']
    },
    name: {
        type: String,
        required: [true, 'The name is required']
    },
    age: {
        type: Number,
        required: [true, 'The age is required'],
    },
    weight: {
        type: String,
        required: [true, 'The weight is required']
    },
    history: {
        type: String,
        required: [true, 'The history is required']
    },
    status: {
        type: Boolean,
        default: true
    },
    movies: {
        type: Schema.Types.ObjectId,
        ref: 'MovieSerie'
    } 
});

module.exports = model( 'Character', CharacterSchema );