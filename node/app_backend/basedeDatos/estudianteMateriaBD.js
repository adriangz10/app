const conexion = require('./conexionBD');

//TODO Falta testeo!!! --Mario
//TODO por favor corregir si todo esto! está mal --Mario
const buscarPorId = async(idEstudianteMateria)=>{

    const consulta = `SELECT * FROM estudianteMateria AS em
            INNER JOIN estudiante, materia AS e, m ON e.idEstudiante AND m.idMateria = em.estudiante, em.materia
            WHERE em.idEstudianteMateria = ?`;

    const [estudianteMateria] = await conexion.query(consulta, [idEstudianteMateria]);

    return estudianteMateria;
}

const listarEstudianteMateria = async()=>{

    const consulta =`SELECT * FROM estudianteMateria AS em
            INNER JOIN estudiante, materia AS e, m ON e.idEstudiante AND m.idMateria = em.estudiante, em.materia`;

    const [estudianteMateria] = await conexion.query(consulta);
    
    return estudianteMateria;
}

module.exports ={
    buscarPorId,
    listarEstudianteMateria
}