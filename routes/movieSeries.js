const { Router } = require('express');
const { check } = require('express-validator');

const { validateInputs } = require('../middlewares/validateInputs');
const { getMovieSeries, createMovieSeries, putMovieSeries, deleteMovieSeries } = require('../controllers/movieSeries');
const { validateJWT } = require('../middlewares/validateJWT');
const { validateMovieSeriesId } = require('../helpers/validateID');

const router = Router();

router.get('/', getMovieSeries );

router.post('/', [
    validateJWT,
    check('img', 'The picture is required').not().isEmpty(),
    check('title', 'The title is required').not().isEmpty(),
    check('premiere', 'The premiere is required').not().isEmpty(),
    check('score', 'The score is required').not().isEmpty(),
    validateInputs,
] , createMovieSeries );

  router.put('/:id', [
      validateJWT,
      check('title', 'The title is required').not().isEmpty(),
      check('id').custom( validateMovieSeriesId ),
      validateInputs
  ], putMovieSeries );

  router.delete('/:id', [
      validateJWT,
      check('title', 'The title is required').not().isEmpty(),
      check('id').custom( validateMovieSeriesId ),
      validateInputs
  ], deleteMovieSeries );

  module.exports = router;