const estudianteBD = require('../basedeDatos/estudianteBD')

buscarPorId = async(req, res) =>{
    try{
        const idEstudiante = req.params.idEstudiante;
        
        if(!idEstudiante){
            res.status(404).json({estado:'FALLO', msj:'Falta el ID'});
        }

        const estudiante = await estudianteBD.buscarPorId(idEstudiante);

        res.json({estado:'OK', dato:estudiante});

    }catch (exec){
        throw exec;
    }
}

buscarTodos = async(req, res) =>{
    try{
       
        const estudiantes = await estudianteBD.buscarTodos();

        res.json({estado:'OK', dato:estudiantes});

    }catch (exec){
        throw exec;
    }
}

eliminar = async(req, res) =>{
    const idEstudiante = req.params.idEstudiante;

    if(!idEstudiante){
        res.status(404).json({estado:'FALLO', msj:'No se especificó el ID del estudiante'});
    }else{
        try{
            await estudianteBD.eliminar(idEstudiante);
            res.status(200).json({estado:'OK', msj:'Estudiante eliminado'});
        }catch (error) {
            console.log(error);
        }
    }
    
}

crear = async(req, res) =>{
    const {dni, nombre, apellido, fechaNacimiento, nacionalidad, correoElectronico, celular, foto} = req.body;

    if(!dni || !nombre || !apellido || !nacionalidad || !correoElectronico){
        
        res.status(404).json({estado:'FALLO', msj:'Faltan campos obligatorios'});
    }else{
        const estudiante = {
            dni:dni, 
            nombre:nombre, 
            apellido:apellido, 
            fechaNacimiento:fechaNacimiento, 
            nacionalidad:nacionalidad, 
            correoElectronico:correoElectronico, 
            celular:celular, 
            foto:foto
        };
        try{
            const estudianteNuevo = await estudianteBD.crear(estudiante);
            res.status(201).json({estado:'Ok', msj:'Estudiante habilitado', dato:estudianteNuevo});
        }catch(exec){
            console.log(exec);
        }
    }
}


module.exports = {
    buscarPorId,
    buscarTodos,
    eliminar,
    crear,
}