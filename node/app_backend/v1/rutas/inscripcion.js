const { Router } = require('express');
const router = Router();

//en este objeto iba también "modificar", lo quito porque no creo que sea necesario modificar una inscripción
const { inscripcionPorId, buscarInscripciones } = require('../../controladores/inscripcion')

//nueva inscripcion
router.post('/nueva', nueva);

//buscar en general y por ID
router.get('/inscripciones/:idInscripcion', inscripcionPorId);
router.get('/inscripciones/', buscarInscripciones);


module.exports = router
