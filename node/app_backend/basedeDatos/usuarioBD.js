const conexion = require('./conexionBD');

//buscar ususarios, recibe como parámetro, el correo y la clave
const buscarUser = async(correoElectronico, clave) =>{
    
    //hacemos la consulta y le pedimos a la base de datos todos los datos correspondientes
    const consulta = `SELECT idUsuario, nombre, apellido,
        tipoUsuario, correElectronico 
        FROM usuario WHERE correoElectronico = ? AND clave = SHA2(?, 256)
        AND activo = 1`;

        //almacenamos una lista con la consulta, el correo y la clave pasadas por parámetro
        const [usuario] = await conexion.query(consulta, [correoElectronico], [clave]);

        //retornamos la lista almacenanda
        return usuario[0];

}


const buscarUserPorId = async(idUsuario) =>{

    //en esta consulta solo requerimos el ID y que esté activo
    const consulta = `SELECT idUsuario
    FROM usuario WHERE idUsuario = ? AND activo = 1`;

    //almacenamos los datos en una lista con la consulta y el ID pasado por parámetro
    const [usuario] = await conexion.query(consulta, [idUsuario]);

    return usuario;
}

module.exports = {
    buscarUser,
    buscarUserPorId
}