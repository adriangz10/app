const conexion = require('./conexionBD');

//buscar por id
const buscarPorIdMat = async(idMateria) =>{
    //lanzamos la consulta
    consulta = `SELECT  nombre, horasSemanales, tipoMateria
    FROM materia WHERE activo= 1 AND idMateria = ?`;
    // creamos una lista conectando con la BD 
    const [materia] = await conexion.query(consulta, [idMateria]);
    //retornamos la lista con la materia especificada por el ID
    return materia; 
}

//buscar todas las materias
const buscarMaterias = async() =>{
    //lanzamos la consulta
    consulta = `SELECT nombre, horasSemanales, tipoMateria
    FROM materia WHERE activo = 1`;
    //creamos una lista conectando con la BD
    const [materias] = await conexion.query(consulta);
    //retornamos la lista con todas la materias
    return materias;
}

//crear una nueva materia
const crearMateria = async(materia) =>{

    const consulta=`INSERT INTO materia SET ?`;

    const [materiaNueva] = await conexion.query(consulta, materia);

    return buscarPorIdMat(materiaNueva.insertId);
}

const eliminarMateria = async(idMateria) =>{
    //para eliminar un elemento, lanzamos la consulta usando UPDATE para actualizar el estado de 1(activo) a 0(inactivo) 
    //como una eliminación lógica
    const consulta = `UPDATE materia SET activo = 0 WHERE idMateria = ?`;
    await conexion.query(consulta, [idMateria]);
}

const editarMateria = async(idMateria, materiaActualizada) =>{
    //lanzamos la consulta que pide los campos a actualizar
    const consulta = "UPDATE materia  \
    SET nombre ='" + materiaActualizada.nombre + "', \
    horasSemanales ='" + materiaActualizada.horasSemanales + "',\
    tipoMateria ='" + materiaActualizada.tipoMateria +
    "' WHERE idMateria =" +idMateria;
    //esperamos a que la consulta se conecte con la BD y muestre los datos actualizados a traves del ID
    await conexion.query(consulta, [materiaActualizada.idMateria]);
}

module.exports = {
    buscarPorIdMat,
    buscarMaterias,
    crearMateria,
    eliminarMateria,
    editarMateria,
}