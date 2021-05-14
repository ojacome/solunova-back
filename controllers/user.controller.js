const { response, request } = require('express');
const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const {generarJWT} = require('../helpers/jwt.helper')


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

const login = async (req = request, res = response) => {
    try {        
        const { email, password } = req.body;

        //verificar si existe usario registrado
        const userDB = await userModel.findOne({ email });        
        if ( !userDB ) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo no se encuentra registrado'
            });
        }        
        
        // Verificar contraseña
        const validPassword = bcrypt.compareSync( password, userDB.password );
        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Las credenciales no son correctas'
            });
        }
        
        // Generar el TOKEN - JWT
        const token = await generarJWT( userDB.id );

        res.status(200).json({
            ok: true,
            token        
        });

    } catch (error) {
        console.log(error)

        res.status(500).json({
            ok: false,
            msg: 'Error al registrar usuario.'
        });
    }
}


module.exports = {
    register,
    login
}