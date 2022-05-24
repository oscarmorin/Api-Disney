const { Router } = require('express');

const { search } = require('../controllers/search');


const router = Router();

//busquedas
router.get('/:coleccion', search);


module.exports = router;