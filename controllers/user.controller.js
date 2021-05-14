const { response, request } = require('express');
const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs');



const register = async(req = request, res = response) => {        
    try {        
        const existeEmail = await userModel.findOne({ email: req.body.email });
        
        if ( existeEmail ) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya está registrado'
            });
        }

        const user = new userModel(req.body);

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync( req.body.password, salt );
        
        const userDB = await user.save();
        userDB.password = ":(";

        res.status(201).json({
            ok: true,
            user: userDB         
        });

    } catch (error) {
        console.log(error)

        res.status(500).json({
            ok: false,
            msg: 'Error al registrar usuario.'
        });
    }

}

const login = (req = request, res = response) => {
    res.status(500).json({
        ok: false,
        msg: 'llega'
    });
}


module.exports = {
    register,
    login
}