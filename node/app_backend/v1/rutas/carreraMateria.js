const { Router } = require('express');
const { listarCarreraMateria, buscarPorId } = require('../../controladores/carreraMateria');


const router = Router();

//buscar por ID y todas
router.get('/carreraMaterias', listarCarreraMateria);
router.get('/carreraMaterias/:idCarreraMaterias', buscarPorId);


module.exports = router;