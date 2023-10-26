const { Router } = require('express');
const { buscarPorId, listarEstudianteMateria } = require('../../controladores/estudianteMateria');



const router = Router();


//buscar todas o por ID
router.get('/estudianteMaterias', listarEstudianteMateria);
router.get('/estudianteMaterias/:idEstudianteMateria', buscarPorId);


//nueva y editar, si acaso son necesarias, igual las dejo comentadas --Mario
//router.post('/estudianteMaterias');
//router.put('/estudianteMaterias/:idEstudianteMaterias');

module.exports= router;
