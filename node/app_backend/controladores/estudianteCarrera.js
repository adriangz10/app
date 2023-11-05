//Se convierte en module ES porque si hago "require" me dice que nuevoEstudianteCarrera no está definindo
const estudianteCarreraBD =  require('../basedeDatos/estudianteCarreraBD');

//TODO Falta testeo!!! --Mario

estudianteCarreraPorIdCarrera = async(req, res)=>{
    try{

        const idEstudianteCarrera = req.params.idEstudianteCarrera;
        if(!idEstudianteCarrera){
        res.status(404).json({estado: 'FALLO', msj:'Falta especificar el ID'});    
        }

        const estudianteCarrera = await buscarPorId(idEstudianteCarrera);
        res.status(200).json({estado:'OK', dato: estudianteCarrera});

    }catch(exec){
        throw exec;
    }

}

inscripcionCarrera = async (req, res) => {
    const {idCarrera, estudiantes} = req.body;
    try{
        const nuevaLista = await estudianteCarreraBD.nuevoEstudianteCarrera(idCarrera,estudiantes);
        res.status(201).json({estado:'OK', msj:'Inscripcion Realizada!'});
    }catch (exec){
        throw exec;
    }
}

//TODO si es necesario se pueden agregar las demás funciones que faltan, "nueva" y "editar"
//TODO como es relacional esta tabla no sé si son necesarias agregar, --Mario


module.exports = {
    estudianteCarreraPorIdCarrera,
    inscripcionCarrera
}