const { Router } = require('express');
const { check } = require('express-validator');

const { validateInputs } = require('../middlewares/validateInputs');
const { getMovieSeries, getListMovieSeries, createMovieSeries, putMovieSeries, deleteMovieSeries } = require('../controllers/movieSeries');
const { validateJWT } = require('../middlewares/validateJWT');
const { validateIdCharacter, validateIdGenre, validateIdMovies } = require('../helpers/validateID');

const router = Router();

router.get('/detalle', getMovieSeries );

router.get('/', getListMovieSeries );

router.post('/', [
    validateJWT,
    check('img', 'The picture is required').not().isEmpty(),
    check('title', 'The title is required').not().isEmpty(),
    check('premiere', 'The premiere is required').not().isEmpty(),
    check('score', 'The score is required').not().isEmpty(),
    check('character').custom(validateIdCharacter),
    check('genre').custom(validateIdGenre),
    validateInputs,
] , createMovieSeries );

  router.put('/:id', [
      validateJWT,
      check('title', 'The title is required').not().isEmpty(),
      check('id').custom( validateIdMovies ),
      validateInputs
  ], putMovieSeries );

  router.delete('/:id', [
      validateJWT,
      check('title', 'The title is required').not().isEmpty(),
      check('id').custom( validateIdMovies ),
      validateInputs
  ], deleteMovieSeries );

  module.exports = router;