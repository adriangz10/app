const conexion = require('./conexionBD');

//buscar por ID
const buscarCarreraPorId = async(idCarrera) =>{
    //lanzmos la consulta pidiendo los datos de la carrera
    const consulta = `SELECT nombre, modalidad, cantMaterias
    FROM carrera WHERE activo = 0 AND idCarrera =?`;

    const [carrera] = await conexion.query(consulta, [idCarrera]);

    return carrera;
 }

//buscar todas las carreras
const buscarCarreras = async() =>{
    //lanzamos la consulta pidiendo los datos de la carrera
    const consulta = `SELECT nombre, modalidad, cantMaterias
    FROM carrera WHERE activo = 0`;
    //pedimos que nos muestre una lista de todas las carreras
    const [carrera] = await conexion.query(consulta);

    return carrera;
 }

//Crear una nueva carrera. NOTA: no sé que pasó acá, pero me al parecer metí la pata y el activo por defecto es 0 en lugar de 1, así que el activo =0 e inactivo =1
const crearCarrera = async(carrera) =>{

    const consulta = `INSERT INTO carrera SET ?`;
    //pedimos que nos devuelva una lista con la carrera recién creada    
    const [carreraNueva] = await conexion.query(consulta, carrera);

    return buscarCarreraPorId(carreraNueva.insertId);
}

//Editar una carrera
const editarCarrera = async(idCarrera, carreraActualizada) =>{

    const consulta = "UPDATE carrera \
    SET nombre ='" + carreraActualizada.nombre + "', \
    modalidad ='" + carreraActualizada.modalidad + "', \
    cantMaterias ='" + carreraActualizada.cantMaterias +
    "'WHERE idCarrera = " + idCarrera;

    await conexion.query(consulta, [carreraActualizada.idCarrera]);

}

//eliminar una carrera
const eliminarCarrera = async(idCarrera) =>{

    const consulta = `UPDATE carrera SET activo = 1 WHERE idCarrera = ?`;
    await conexion.query(consulta, [idCarrera]);
}


module.exports = {  
    buscarCarreraPorId,
    buscarCarreras,
    crearCarrera,
    editarCarrera,
    eliminarCarrera
}