const {response} = require('express');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const {generarToken} = require('../helpers/jwt');

const crearUsuario = async (req, resp = response) => {

    const {email, contraseña} = req.body;

    try {
        let usuario = await Usuario.findOne({email})
        if(usuario) {
            return resp.status(400).json({
                ok: false,
                msj: 'El correo del usuario ya existe',   
            });
        }
        usuario = new Usuario(req.body);
        const salt = bcrypt.genSaltSync();
        usuario.contraseña = bcrypt.hashSync(contraseña, salt);
        await usuario.save();
        
        const token = await generarToken(usuario.id, usuario.name);
    
        resp.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token: token
        });

    } catch (error) {
        resp.status(500).json({
            ok: false,
            msj: 'Hable con el administrador',
        });
    }
}

const loginUsuario = async (req, resp = response) => {

    const {email, contraseña} = req.body;

    try {
        const usuario = await Usuario.findOne({email})
        if(!usuario) {
            return resp.status(400).json({
                ok: false,
                msj: 'El usuario no existe',   
            });
        }  

        const validPassword = bcrypt.compareSync(contraseña, usuario.contraseña);
        if(!validPassword) {
            return resp.status(400).json({
                ok: false,
                msj: 'Contraseña incorrecta',
            })
        }

        const token = await generarToken(usuario.id, usuario.name);

        resp.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token: token
        })

    } catch (error) {
        resp.status(500).json({
            ok: false,
            msj: 'Hable con el administrador',
        });
    }
}

const revalidarToken = async (req, resp = response) => {

    const {uid, name} = req;
    const token = await generarToken(uid, name);

    resp.json({
        ok: true,
        uid: name,
        token: token,
    });
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}