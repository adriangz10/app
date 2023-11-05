const { Router } = require('express');
const { estudianteCarreraPorIdCarrera, inscripcionCarrera } = require('../../controladores/estudianteCarrera');



const router = Router();


router.get('/estudianteCarreras/:idEstudianteCarrera', estudianteCarreraPorIdCarrera );
router.post('/estudianteCarreras/', inscripcionCarrera);

//TODO No sé si sería correcto hacerlo, pero dejo comentadas las líneas crear nueva y modificar en todo caso --Mario

//router.post('/estudianteCarrera', );
//router.put('/estudianteCarrera/:idEstudianteCarrera', )

module.exports = router;