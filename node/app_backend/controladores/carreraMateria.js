const carreraMateriaBD = require('../basedeDatos/carreraMateriaBD');

//TODO Falta testeo!!! --Mario

buscarPorId = async(req, res)=>{
    try{

        const idCarreraMateria = req.params.idCarreraMateria;
        if(!idCarreraMateria){
        res.status(404).json({estado: 'FALLO', msj:'Falta especificar el ID'});    
        }

        const carreraMateria = await carreraMateriaBD.buscarPorId(idCarreraMateria);
        res.status(200).json({estado:'OK', dato: carreraMateria});

    }catch(exec){
        throw exec;
    }

}

listarCarreraMateria = async(req, res)=>{
    try{
        const carreraMateria = await carreraMateria.listarCarreraMateria();
        res.status(200).json({estado:'OK', dato:carreraMateria});


    }catch(exec){
        throw exec;
    }
}

//TODO si es necesario se pueden agregar las demás funciones que faltan, "nueva" y "editar"
//TODO como es relacional esta tabla no sé si son necesarias agregar, --Mario

module.exports={
    buscarPorId,
    listarCarreraMateria
}