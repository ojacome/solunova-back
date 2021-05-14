/*
    Ruta: /api
*/
const { Router } = require('express');
const  {register, login, getUser} = require('../controllers/user.controller')
const {validarJWT} = require('../middlewares/jwt.middleware')



const router = Router();


router.get( '/users', validarJWT, getUser );
router.post( '/users', register );
router.post( '/login', login );


module.exports = router;