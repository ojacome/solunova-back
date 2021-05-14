/*
    Ruta: /api/users
*/
const { Router } = require('express');
const  {register} = require('../controllers/user.controller')




const router = Router();


router.post( '/users', register );


module.exports = router;