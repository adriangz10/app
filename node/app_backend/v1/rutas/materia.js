const { Router } = require('express');
const { buscarPorIdMat } = require('../../controladores/materia')

const router = Router();


//Crear una nueva materia
router.post('/materias', crearMateria);

//Eliminar una materia
router.delete('/materias/:idMateria', eliminarMateria);

//Actualizar materia
router.put('/materias/:idMateria', editarMateria);

//Buscar todas
router.get('/materias', buscarMaterias);

//Buscar por ID
router.get('/materias/:idMateria', buscarPorIdMat);


module.exports = router
