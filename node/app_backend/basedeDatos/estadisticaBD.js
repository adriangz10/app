const conexion = require('./conexionBD');

const estadistica = async() =>{
    //esto se va a ver la próxima clase
    const consulta = await 'call procEstadistica';

    const [resultados] = await conexion.query(consulta);

    const materias = resultados[1][0].materias;
    const estudiante = resultados[0][0].estudiante;

    const datos = {
        materiasActivas: materias,
        estudianteActivos: estudiante
    }
    return datos;
}

module.exports={
    estadistica
}
