/*
    Ruta: /api
*/
const { Router } = require('express');
const { check } = require('express-validator');
const  {register, login, getUser} = require('../controllers/user.controller')
const {validarJWT} = require('../middlewares/jwt.middleware')
const {validarCampos} = require('../middlewares/validation.middleware')


const router = Router();


router.get( '/users', validarJWT, getUser );

router.post( '/users', 
    [        
        check('first_name', 'El nombre es obligatorio').not().isEmpty(),
        check('last_name', 'El apellido es obligatorio').not().isEmpty(),
        check('username', 'El username es obligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        validarCampos,
    ],
    register 
);

router.post( '/login', 
    [        
        check('password', 'El password es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        validarCampos,
    ], 
    login 
);


module.exports = router;