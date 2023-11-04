const conexion = require('./conexionBD');

//TODO Falta testeo!!! --Mario
//TODO por favor corregir si todo esto! está mal --Mario
const estudianteMateriaPorIdMateria = async(idMateria)=>{

    const consulta = `SELECT e.idEstudiante, e.nombre, e.apellido. e.correoElectronico  
        FROM estudiante AS e
            INNER JOIN estudianteMateria, materia AS em ON em.estudiante = e.idEstudiante
            WHERE e.activo = 1 AND em.materia = ?`;

    const [inscriptoMateria] = await conexion.query(consulta, idMateria);

    return inscriptoMateria;
}

const borrarPorIdMateria = async()=>{

    const consulta =`DELETE FROM estudianteMateria WHERE materia = ?`;

    const [result] = await conexion.query(consulta);
    
    return result;
}

const inscripcionMateria = async(idMateria, estudiante) =>{
    
    const inscripcionMat = await conexion.getConnection();

    try{
        await inscripcionMat.beginTransaction();

        await borrarPorIdMateria(inscripcionMat, idMateria);

        estudiante.forEach(async element =>{
            const datos = {materia:idMateria, estudiante:element}
            const consulta = `INSERT INTO estudianteMateria SET ?`;
            const [result] = await conexion.query(consulta, datos);
        })

        await inscripcionMat.commit();
    }catch(error){
        await inscripcionMat.rollback();
    }finally{
        inscripcionMat.release();
    }
   ;
}

module.exports ={
    estudianteMateriaPorIdMateria,
    borrarPorIdMateria,
    inscripcionMateria
}