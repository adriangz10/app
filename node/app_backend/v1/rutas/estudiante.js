const { Router } = require('express');
const { buscarPorId } = require('../../controladores/estudiante');


const router = Router();

//agregar/crear un estudiante nuevo
 router.post('/estudiantes', crear);

//eliminar
router.delete('/estudiantes/:idEstudiante', eliminar);

//editar o actualizar
router.put('/estudiantes/:idEstudiante', editar);

//buscar
 router.get('/estudiantes', buscarTodos);

//buscar por ID
router.get('/estudiantes/:idEstudiante', buscarPorId);


module.exports = router