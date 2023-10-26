
const materiaBD = require('../basedeDatos/materiaBD')


buscarPorIdMat = async(req, res) =>{
    try{
        const idMateria = req.params.idMateria;

        if(!idMateria){
            res.status(404).json({estado: 'FALLO', msj:'Falta el ID'});
        }

        const materia = await materiaBD.buscarPorIdMat(idMateria);

        res.json({estado: 'OK', dato: materia});
    }catch(exec){
        throw exec;
    }

}

buscarMaterias = async(req, res) =>{
    
    try{
        const materias = await materiaBD.buscarMaterias();

        res.json({estado: 'OK', dato: materias});
    }catch(exec){
        throw exec;
    }
}

crearMateria = async(req, res) =>{
    //desde el body recibimos los datos
    const {nombre, horasSemanales, tipoMateria} = req.body;
    //controlamos si faltan campos por rellenar
    if(!nombre || !horasSemanales || !tipoMateria){
        res.status(404).json({estado: 'FALLO', msj: 'Faltan campos obligatorios'});
    }else{//si todo está correcto los datos van complentando el json
        const materia ={
            nombre: nombre,
            horasSemanales: horasSemanales,
            tipoMateria: tipoMateria
        };
        try{//conectamos con la consulta de la BD?
            const materiaNueva = await materiaBD.crearMateria(materia);
            res.status(201).json({estado: 'OK', msj:'Materia habilitada', dato: materiaNueva});
        }catch(exec){
            throw exec;
        }
    }
}

eliminarMateria = async(req, res) =>{

    const idMateria = req.params.idMateria;
    
    if(!idMateria){
        res.status(404).json({estado: 'FALLO', msj: 'No se ha especificado un ID'});
        
    }else{
        try{
            await materiaBD.eliminarMateria(idMateria);
            res.status(200).json({estado: 'OK', msj: 'Materia eliminada'})
        }catch(exec){
            throw exec;
        }
    }
}

editarMateria = async(req, res) =>{

    const idMateria = req.params.idMateria;
    const actualizarMateria = req.body

    try{
        if(!idMateria){
            res.status(404).json({estado: 'FALLO', msj: 'No se especificó un ID'});
        }

        const materia = await materiaBD.buscarPorIdMat(idMateria);

        if(!idMateria || materia.length == 0) {
            res.status(404).json({estado: 'FALLO', msj:'Materia no encontrada'});
            return;
        }
        //esperamos que se conecte con la BD indicando el ID y los datos que queremos 
        //guardar desde el body, y guardamos los datos editados 
        const materiaActualizada = await materiaBD.editarMateria(idMateria, actualizarMateria);
        res.status(200).json({estado: 'OK', msj: 'Datos de la materia', dato: materiaActualizada});
        return materiaActualizada;
    }catch(exec){
        throw exec;
    }
}

module.exports = {
    buscarPorIdMat,
    buscarMaterias,
    crearMateria,
    eliminarMateria,
    editarMateria
}