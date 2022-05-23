const { Router } = require('express');
const { check } = require('express-validator');

const { validateInputs } = require('../middlewares/validateInputs');
const { validateJWT } = require('../middlewares/validateJWT');
const { getCharacter, getListCharacter, createCharacter, putCharacter, deleteCharacter } = require('../controllers/character');
const { validateIdMovies, validateIdCharacter } = require('../helpers/validateID');

const router = Router();

//ObtenerListaPeronajes
router.get('/', getListCharacter );

//ObtenerPeronajesFull
router.get('/detalle', getCharacter );

//CrearPeronajes
router.post('/', [
    validateJWT,
    check('img', 'The picture is required').not().isEmpty(),
    check('name', 'The name is required').not().isEmpty(),
    check('age', 'The age is required').not().isEmpty(),
    check('weight', 'The weight is required').not().isEmpty(),
    check('history', 'The history is required').not().isEmpty(),
    check('movies').custom( validateIdMovies ),
    validateInputs,
  ] , createCharacter );

  //ActualizarPeronajes
  router.put('/:id', [
      validateJWT,
      check('name', 'The name is required').not().isEmpty(),
      check('id').custom( validateIdCharacter ),
      validateInputs
  ], putCharacter );

//Peronajes
router.delete('/:id', [
      validateJWT,
      check('name', 'The name is required').not().isEmpty(),
      check('id').custom( validateIdCharacter ),
      validateInputs
  ], deleteCharacter );

  module.exports = router;