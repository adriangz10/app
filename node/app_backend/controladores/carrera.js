
const carreraBD = require('../basedeDatos/carreraBD');


//buscar por ID
buscarCarreraPorId = async(req, res) =>{
    try{
        const  idCarrera = req.params.idCarrera;
        
        if(!idCarrera){
            res.status(404).json({estado: 'FALLO', msj: 'Falta el ID'});
        }

        const carrera = await carreraBD.buscarCarreraPorId(idCarrera);
        
        res.json({estado: 'OK', dato: carrera});

    }catch(exec){
        throw exec;
    }
}

//buscar todas las carreras
buscarCarreras = async(req, res) =>{
    try{
        const carreras = await carreraBD.buscarCarreras();
        res.status(200).json({estado: 'OK', dato: carreras});
    }catch(exec){
        throw exec;
    }
}

//habilitar una nueva carrera
crearCarrera = async(req, res) =>{
    const {nombre, modalidad, cantMaterias} = req.body

    if(!nombre || !modalidad || !cantMaterias){
        res.status(404).json({estado: 'FALLO', msj: 'Faltan campos obligatorios'});
    }else{
        const carrera ={
            nombre: nombre,
            modalidad: modalidad,
            cantMaterias: cantMaterias
        };
        try{
            const carreraNueva = await carreraBD.crearCarrera(carrera);
            res.status(201).json({estado: 'OK', msj: 'Carrera habilitada', dato: carreraNueva});
        }catch(exec){
            throw exec;
        }
    }

}


//actualizar una carrera
editarCarrera = async(req, res) =>{
    const idCarrera = req.params.idCarrera;
    const actualizarCarrera = req.body;

    try{
        if(!idCarrera){
            res.status(404).json({estado: 'FALLO', msj: 'No se ha especificado un ID'});
        }

        const carrera = await carreraBD.buscarCarreraPorId(idCarrera);

        if(!carrera || carrera.length == 0){
            res.status(404).json({estado: 'FALLO', msj: 'Carrera no encontrada'})
            return;
        }

        const carreraActualizada = await carreraBD.editarCarrera(idCarrera, actualizarCarrera);
        res.status(200).json({estado: 'OK', msj: 'Carrera actualizada', datos: carreraActualizada});
    }catch(exec){
        throw exec;
    }
}

//eliminar una carrera
eliminarCarrera = async(req, res) =>{
    const idCarrera = req.params.idCarrera;
    if(!idCarrera){
        res.status(404).json({estado: 'FALLO', msj:'No se ha especificado un ID'});
    }else{
        try{
            await carreraBD.eliminarCarrera(idCarrera);
            res.status(200).json({estado: 'OK', msj: 'Carrera eliminada'});
        }catch(exec){
            throw exec;
        }
    }
}


module.exports ={
    buscarCarreraPorId,
    buscarCarreras,
    crearCarrera,
    editarCarrera,
    eliminarCarrera
}