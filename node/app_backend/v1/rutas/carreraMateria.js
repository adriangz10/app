const { Router } = require('express');
const { carreraMateriaPorIdMateria, nuevaMateria } = require('../../controladores/carreraMateria');


const router = Router();

//buscar por ID y todas;
router.get('/carreraMaterias/:idCarreraMaterias', carreraMateriaPorIdMateria);
router.post('/carreraMaterias/', nuevaMateria);


module.exports = router;