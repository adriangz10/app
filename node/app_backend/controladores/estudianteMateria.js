const estudianteMateriaBD = require('../basedeDatos/estudianteMateriaBD');

//TODO Falta testeo!!! --Mario

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

listarEstudianteMateria = async(req, res)=>{
    try{
        const estudianteMateria = await estudianteMateria.listarEstudianteMateria();
        res.status(200).json({estado:'OK', dato:estudianteMateria});


    }catch(exec){
        throw exec;
    }
}

//TODO si es necesario se pueden agregar las demás funciones que faltan, "nueva" y "editar"
//TODO como es relacional esta tabla no sé si son necesarias agregar, --Mario

module.exports={
    buscarPorId,
    listarEstudianteMateria
}