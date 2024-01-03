/*
    RUTAS USUARIOS // AUTH
    host + /api/events
*/

const {Router} = require('express');
const {check} = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const {validarJWT} = require('../middlewares/validar-jwt');
const { getEventos, crearEventos, actualizarEventos, eliminarEventos } = require("../controllers/events");
const { isDate } = require('../helpers/isDate');
const router = Router();

// validar JWT
router.use(validarJWT);

// Obtener eventos
router.get('/',getEventos);

// Crear evento
router.post(
    '/',
    [
        check('title', 'El Titulo es Obligatorio').not().isEmpty(),
        check('start', 'Fecha de Inicio Obligatoria').custom(isDate),
        check('start', 'Fecha de Finalización Obligatoria').custom(isDate),
        validarCampos,
    ],
    crearEventos
)

// Actualizar evento
router.put(
    '/:id', 
    [
        check('title', 'El Titulo es Obligatorio').not().isEmpty(),
        check('start', 'Fecha de Inicio Obligatoria').custom(isDate),
        check('start', 'Fecha de Finalización Obligatoria').custom(isDate),
        validarCampos,
    ],
    actualizarEventos
    )

// Borrar evento
router.delete('/:id', eliminarEventos)

module.exports = router;