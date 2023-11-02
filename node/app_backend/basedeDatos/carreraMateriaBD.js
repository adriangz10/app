const conexion = require('./conexionBD');

//TODO Falta testeo!!! --Mario

const buscarPorId = async(idCarreraMateria)=>{

    const consulta = `SELECT * FROM carreraMateria as cm
            INNER JOIN carrera, materia AS c, m ON c.idCarrera AND m.idMateria = cm.carrera, cm.materia
            WHERE cm.idCarreraMateria = ?`;

    const [carreraMateria] = await conexion.query(consulta, [idCarreraMateria]);

    return carreraMateria;
 }


const listarCarreraMaterias = async() =>{

    const consulta = `SELECT * FROM carreraMateria AS cm
            INNER JOIN carrera, materia AS c, m ON c.idCarrera AND m.idMateria = cm.carrera, cm.materia`;

    const [carreraMaterias] = await conexion.query(consulta);

    return carreraMaterias;
} 


module.exports={
    buscarPorId,
    listarCarreraMaterias
}