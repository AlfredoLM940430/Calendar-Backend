/*
    RUTAS USUARIOS // AUTH
    host + /api/auth
*/

const {Router} = require('express');
const {check} = require('express-validator');
const router = Router();

const {crearUsuario, loginUsuario, revalidarToken} = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const {validarJWT} = require('../middlewares/validar-jwt');

router.post(
    '/new', 
    [
        check('name', 'El Nombre es Obligatorio').not().isEmpty(),
        check('email', 'El Email es Obligatorio').isEmail(),
        check('contraseña', 'La contraseña debe contener al menos 6 caracteres').isLength({min:6}),
        validarCampos
    ], 
    crearUsuario);

router.post(
    '/', 
    [
        check('email', 'El Email es Obligatorio').isEmail(),
        check('contraseña', 'La contraseña debe contener al menos 6 caracteres').isLength({min:6}),
        validarCampos
    ],
    loginUsuario);

router.get('/renew', validarJWT, revalidarToken);

module.exports = router;