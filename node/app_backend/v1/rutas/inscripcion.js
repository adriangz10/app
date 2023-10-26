const { Router } = require('express');
const router = Router();

//en este objeto iba también "modificar", lo quito porque no creo que sea necesario modificar una inscripción
const {inscripcionesPorId, buscarInscripcion, nueva } = require('../../controladores/')

//nueva inscripcion
router.post('/nueva', nueva);

//buscar en general y por ID
router.get('/inscripciones/:idInscripcion', inscripcionesPorId);
router.get('/inscripciones/', buscarInscripcion);


module.exports = router
