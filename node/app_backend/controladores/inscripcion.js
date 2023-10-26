const inscripcionBD = require('../basedeDatos/inscripcionBD');


buscarInscripciones = async(req, res) =>{
    try{
        const inscripciones = await inscripcionBD.buscarInscripciones();
        res.status(200).json({estado:'OK', dato:inscripciones})
    }catch(exec){
        throw exec;
    }
}

inscripcionPorId = async(req, res) =>{

    const idInscripcion = req.params.idInscripcion;
    if(!idInscripcion){
        res.status(404).json({estado:'FALLO', msj:'No se ha especificado un ID'});
    }else{
        try{
            const inscripcion = await inscripcionBD.inscripcionPorId(idInscripcion);
        }catch(exec){
            throw exec;
        }
    }
}

nueva = async(req, res) =>{

    const {fecha, estudiante, carrera, materia} = req.body;
    
    if(!estudiante|| !carrera || !materia){
        res.status(404).json({estado: 'FALLO', msj:' Faltan datos requeridos'});
    }else{
            const inscripcion ={
                fecha:fecha,
                estudiante:estudiante,
                carrera: carrera,
                materia: materia
            }
            try{
                const nuevaInscripcion = await inscripcionBD.nueva(inscripcion);
                res.status(201).json({estado:'OK', msj:'Estudiante inscripto', dato:nuevaInscripcion});
            }catch(exec){
                throw exec;
            }
        }
    }

module.exports={
    buscarInscripciones,
    inscripcionPorId,
    nueva
}