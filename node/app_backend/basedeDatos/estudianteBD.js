const conexion = require('./conexionBD');

const buscarPorId = async (idEstudiante) => {

    const consulta = `SELECT  dni, nombre, apellido,
    (CASE 
        WHEN nacionalidad = 0 THEN 'Argentina'
        WHEN nacionalidad = 1 THEN 'Uruguay'
        WHEN nacionalidad = 2 THEN 'Chile'
        WHEN nacionalidad = 3 THEN 'Paraguay'
        WHEN nacionalidad = 4 THEN 'Brasil'
        WHEN nacionalidad = 5 THEN 'Bolivia'
        ELSE ''
    END
        ) AS nacionalidad 
    FROM estudiante WHERE activo = 1 AND idEstudiante = ?`;

    const [estudiante] = await conexion.query(consulta, [idEstudiante]);

    return estudiante;
}


const buscarTodos = async () => {

    const consulta = `SELECT  dni, nombre, apellido, fechaNacimiento, correoElectronico, celular, foto,
    (CASE 
        WHEN nacionalidad = 0 THEN 'Argentina'
        WHEN nacionalidad = 1 THEN 'Uruguay'
        WHEN nacionalidad = 2 THEN 'Chile'
        WHEN nacionalidad = 3 THEN 'Paraguay'
        WHEN nacionalidad = 4 THEN 'Brasil'
        WHEN nacionalidad = 5 THEN 'Bolivia'
        ELSE ''
    END
        ) AS nacionalidad 
    FROM estudiante 
    WHERE activo = 1`;

    const [estudiantes] = await conexion.query(consulta);

    return estudiantes;
}

const eliminar = async (idEstudiante) => {
    const consulta = `UPDATE estudiante SET activo = 0 WHERE idEstudiante = ?`;
    await conexion.query(consulta, [idEstudiante]);
}

const crear = async (estudiante) => {
    //const {dni, nombre, apellido, fechaNacimiento, nacionalidad, correoElectronico, celular, foto} = estudiante;
    //const consulta =`INSERT INTO estudiante (dni, nombre, apellido, fechaNacimiento, nacionalidad, correoElectronico, celular, foto) 
    //VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1)`
    const consulta = `INSERT INTO estudiante SET ?`;
    const [estudianteNuevo] = await conexion.query(consulta, estudiante);

    //console.log(estudianteNuevo.insertId);
    return buscarPorId(estudianteNuevo.insertId);
}

const editar = async (idEstudiante, estudianteActualizado) => {
    const consulta = "UPDATE estudiante \
        SET dni = '" + estudianteActualizado.dni + "', \
        nombre = '" + estudianteActualizado.nombre + "', \
        apellido = '" + estudianteActualizado.apellido + "', \
        fechaNacimiento = '" + estudianteActualizado.fechaNacimiento + "', \
        correoElectronico = '" + estudianteActualizado.correoElectronico + "', \
        celular = '" + estudianteActualizado.celular + "', \
        foto = '" + estudianteActualizado.foto +
        "' WHERE idEstudiante = " + idEstudiante;

    //const consulta = "UPDATE estudiante SET nombre = '" + estudianteActualizado.nombre + "' WHERE idEstudiante = 1";
    await conexion.query(consulta, [estudianteActualizado.idEstudiante]); // TODO Supongo que así llamaría la ID del estudiante, tengo que testear.
}

module.exports = {
    buscarPorId,
    buscarTodos,
    eliminar,
    crear,
    editar,
}