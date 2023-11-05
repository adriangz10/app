const carreraMateriaBD = require('../basedeDatos/carreraMateriaBD');

//TODO Falta testeo!!! --Mario

carreraMateriaPorIdMateria = async(req, res)=>{
    const {idCarrera} = req.params;

    try{
        const materiasAñadidas = await carreraMateriaBD.carreraMateriaPorIdMateria(idCarrera);
        res.status(201).json({estado:'OK', dato:materiasAñadidas});
    }catch(exec){
        throw exec;
    }

}

nuevaMateria = async (req, res)=>{
    const {idCarrera, materias} = req.body;

    try{
        const nuevaMateria = await carreraMateriaBD.nueva(idCarrera,materias);
        res.status(201).json({estado:'OK', msj:'Materia añádida'});
    }catch(exec){
        throw exec;
    }
}

//TODO si es necesario se pueden agregar las demás funciones que faltan, "nueva" y "editar"
//TODO como es relacional esta tabla no sé si son necesarias agregar, --Mario

module.exports={
    carreraMateriaPorIdMateria,
    nuevaMateria
}