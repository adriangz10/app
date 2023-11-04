const conexion = require('./conexionBD');


//TODO por favor, corregir todo esto! si está mal --Mario

const estudianteCarreraPorIdCarrera = async(idCarrera) =>{

    const consulta =`SELECT e.idEstudiante, e.nombre, e.apellido, e.correoElectronico
            (CASE
                WHEN nacionalidad = 0 THEN Argentina 
                WHEN nacionalidad = 1 THEN Uruguay
                WHEN nacionalidad = 2 THEN Chile
                WHEN nacionalidad = 3 THEN Paraguay
                WHEN nacionalidad = 4 THEN Brasil
                WHEN nacionalidad = 5 THEN Bolivia
                ELSE ''
                END
                ) AS nacionalidad
                FROM estudiante AS e 
                INNER JOIN estudianteCarrera AS ec
                ON ec.estudiante = e.idEstudiante
                WHERE e.activo = 1 AND ec.carrera = ?`;

    const [inscriptosCarrera] = await conexion.query(consulta, idCarrera);
    
    return inscriptosCarrera;
}


const borrarPorIdCarrera = async(inscripcion, idCarrera)=>{

    const consulta = `DELETE FROM estudianteCarrera WHERE carrera = ?`;
    
    const [result] = await inscripcion.query(consulta, idCarrera);

    return result;
}

const nuevoEstudianteCarrera = async(idCarrera, estudiantes) =>{

    const inscripcion = await conexion.getConnection();
    try{
        await inscripcion.beginTransaction();

        await borrarPorIdCarrera(inscripcion, idCarrera);

        estudiantes.forEach(async element =>{
            const dato = {carrera:idCarrera, estudiante:element}
            const consulta = `INSER INTO estudianteCarrera SET ?`;
            const [result] = await conexion.query(consulta, dato);
        })

        await inscripcion.commit()
    }catch (error){
        await inscripcion.rollback();
        throw error;
    }finally{
        inscripcion.release();
    }
    
}



module.exports={
    estudianteCarreraPorIdCarrera,
    borrarPorIdCarrera,
    nuevoEstudianteCarrera
}