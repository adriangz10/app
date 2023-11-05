const estudianteMateriaBD = require('../basedeDatos/estudianteMateriaBD');

//TODO Falta testeo!!! --Mario


inscripcionMateria = async (req, res) => {
    const {idMateria, estudiantes} = req.body;
    try{
        const nuevaLista = await estudianteMateriaBD.nueva(idMateria,estudiantes);
        res.status(201).json({estado:'OK', msj:'Ya está inscripto en la materia!'});
    }catch (exec){
        throw exec;
    }
}

buscarPorId = async(req, res)=>{
    try{

        const idEstudianteMateria = req.params.idEstudianteMateria;
        if(!idEstudianteMateria){
        res.status(404).json({estado: 'FALLO', msj:'Falta especificar el ID'});    
        }

        const estudianteMateria = await estudianteMateriaBD.buscarPorId(idEstudianteMateria);
        res.status(200).json({estado:'OK', dato: estudianteMateria});

    }catch(exec){
        throw exec;
    }

}


//TODO si es necesario se pueden agregar las demás funciones que faltan, "nueva" y "editar"
//TODO como es relacional esta tabla no sé si son necesarias agregar, --Mario

module.exports={
    buscarPorId,
    inscripcionMateria
}