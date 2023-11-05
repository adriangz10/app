const conexion = require('./conexionBD');

const estadistica = async() =>{
    //esto se va a ver la próxima clase
    const consulta ='CALL procEstadisticas';

    const [resultados] = await conexion.query(consulta);

    const materias = resultados[1][0].materias;
    const estudiante = resultados[0][0].estudiante;
    const carreras = resultados[1][0].carreras;
    const datos = {
        materiasActivas: materias,
        estudianteActivos: estudiante,
        carrerasActivas: carreras,
        materiaInactivas: materias,
        estudiantesInactivos: estudiante,
        carreraInactivas: carreras
    }
    return datos;
}

module.exports={
    estadistica
}
