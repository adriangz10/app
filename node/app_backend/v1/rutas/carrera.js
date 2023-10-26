const Router = require('express');
const { buscarCarreraPorId } = require('../../controladores/carrera');


const router = Router();

//buscar por ID
router.get('/carreras/:idCarrera', buscarCarreraPorId);
//buscar todas las carreras
router.get('/carreras', buscarCarreras);

//crear una nueva carrera
router.post('/carreras', crearCarrera);

//editar una carrera
router.put('/carreras/:idCarrera', editarCarrera);

//eliminar una carrera
router.delete('/carreras/:idCarrera', eliminarCarrera);

module.exports = router