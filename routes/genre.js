const { Router } = require('express');
const { check } = require('express-validator');

const { validateInputs } = require('../middlewares/validateInputs');
const { getGenre, createGenre, putGenre, deleteGenre } = require('../controllers/genre');
const { validateJWT } = require('../middlewares/validateJWT');
const { validateMovieSeriesId } = require('../helpers/validateID');

const router = Router();

router.get('/', getGenre );

router.post('/', [
    validateJWT,
    check('title', 'The title is required').not().isEmpty(),
    check('img', 'The picture is required').not().isEmpty(),
    validateInputs,
] , createGenre );

router.put('/', putGenre );

router.delete('/', deleteGenre );

module.exports = router;