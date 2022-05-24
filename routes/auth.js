const { Router } = require('express');
const { check } = require('express-validator');

const { validateInputs } = require('../middlewares/validateInputs');
const { login } = require('../controllers/login');
const { createUser } = require('../controllers/register');
const { roleExists, mailExists } = require('../middlewares/db-validator');

const router = Router();

router.post('/login',[
    check('mail', 'The mail is not be empty').isEmail(),
    check('password', 'The password is not be empty').not().isEmpty(),
    validateInputs
], login);

router.post('/register', [
    check('name', 'The name is required').not().isEmpty(),
    check('password', 'The password is more be 6 character').isLength({ min: 6 }),
    check('mail', 'El correo no es válido').isEmail(),
    check('mail').custom( mailExists ),
    //check('rol', 'No es un rol permitido').isIn('ADMIN_ROLE','USER_ROLE'),
    check('role').custom( roleExists ),
    validateInputs,
  ] , createUser );

module.exports = router;