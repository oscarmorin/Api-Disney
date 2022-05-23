const { Router } = require('express');
const { check } = require('express-validator');

const { validateInputs } = require('../middlewares/validateInputs');
const { getCharacter, createCharacter, putCharacter, deleteCharacter } = require('../controllers/character');
const { validateJWT } = require('../middlewares/validateJWT');
const { validateCharacterId } = require('../helpers/validateID')

const router = Router();

//ObtenerPeronajes
router.get('/', getCharacter );

//CrearPeronajes
router.post('/', [
    validateJWT,
    check('img', 'The picture is required').not().isEmpty(),
    check('name', 'The name is required').not().isEmpty(),
    check('age', 'The age is required').not().isEmpty(),
    check('weight', 'The weight is required').not().isEmpty(),
    check('history', 'The history is required').not().isEmpty(),
    validateInputs,
  ] , createCharacter );

  //ActualizarPeronajes
  router.put('/:id', [
      validateJWT,
      check('name', 'The name is required').not().isEmpty(),
      check('id').custom( validateCharacterId ),
      validateInputs
  ], putCharacter );

//Peronajes
router.delete('/:id', [
      validateJWT,
      check('name', 'The name is required').not().isEmpty(),
      check('id').custom( validateCharacterId ),
      validateInputs
  ], deleteCharacter );

  module.exports = router;