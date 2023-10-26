const estudianteCarreraBD = require('../basedeDatos/estudianteCarreraBD');

//TODO Falta testeo!!! --Mario

buscarPorId = async(req, res)=>{
    try{

        const idEstudianteCarrera = req.params.idEstudianteCarrera;
        if(!idEstudianteCarrera){
        res.status(404).json({estado: 'FALLO', msj:'Falta especificar el ID'});    
        }

        const estudianteCarrera = await estudianteCarreraBD.buscarPorId(idEstudianteCarrera);
        res.status(200).json({estado:'OK', dato: estudianteCarrera});

    }catch(exec){
        throw exec;
    }

}

listarEstudianteCarrera = async(req, res)=>{
    try{
        const estudianteCarrera = await estudianteCarrera.listarEstudianteCarrera();
        res.status(200).json({estado:'OK', dato:estudianteCarrera});


    }catch(exec){
        throw exec;
    }
}

//TODO si es necesario se pueden agregar las demás funciones que faltan, "nueva" y "editar"
//TODO como es relacional esta tabla no sé si son necesarias agregar, --Mario

module.exports={
    buscarPorId,
    listarEstudianteCarrera
}