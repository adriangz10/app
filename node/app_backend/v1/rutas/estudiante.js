const { Router } = require('express');
const { buscarPorId, editar, crear } = require('../../controladores/estudiante');


const router = Router();

// //agregar
router.post('/estudiantes', crear);

// //eliminar
router.delete('/estudiantes/:idEstudiante', eliminar);

// //editar
router.put('/estudiantes/:idEstudiante', editar);

// //buscar
router.get('/estudiantes', buscarTodos);

//buscar por ID
router.get('/estudiantes/:idEstudiante', buscarPorId);


module.exports = router