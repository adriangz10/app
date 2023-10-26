const { Router } = require('express');

const router = Router();


router.get('/estudianteCarreras/:idEstudianteCarrera', buscarPorId);
router.get('/estudianteCarreras', listarEstudianteCarrera);


//TODO No sé si sería correcto hacerlo, pero dejo comentadas las líneas crear nueva y modificar en todo caso --Mario

//router.post('/estudianteCarrera', );
//router.put('/estudianteCarrera/:idEstudianteCarrera', )

module.exports = router;