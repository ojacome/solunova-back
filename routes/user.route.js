/*
    Ruta: /api/users
*/
const { Router } = require('express');
const  {register, login} = require('../controllers/user.controller')




const router = Router();


router.post( '/users', register );
router.post( '/login', login );


module.exports = router;