const conexion = require('./conexionBD');


//TODO por favor, corregir todo esto! si está mal --Mario

const buscarPorId = async(idEstudianteCarrera) =>{

    const consulta =`SELECT * FROM estudianteCarrera AS ec
            INNER JOIN estudiante, carrera AS e, c ON e.idEstudiante AND c.idCarrera = ec.estudiante, ec.carrera
            WHERE ec.idEstudianteCarrera = ?`;

    const [estudianteCarrera] = await conexion.query(consulta, [idEstudianteCarrera]);
    
    return estudianteCarrera;
}


const listarEstudianteCarrera = async()=>{

    const consulta = `SELECT * FROM estudianteCarrera AS ec
            INNER JOIN estudiante, carrera AS e, c ON e.idEstudiante AND c.idCarrea = ec.estudiante, ec.carrera`;
    
    const [estudiantesCarrera] = await conexion.query(consulta);

    return estudiantesCarrera;
}




module.exports={
    buscarPorId,
    listarEstudianteCarrera
}