const estadisticaBD = require('../basedeDatos/estadisticaBD');


estadistica = async(req, res) =>{
    //nos conectamos a la base de datos para pedir la estadistica, si sale bien, retornamos un 200 con los datos de la misma
    const estadistica = await estadisticaBD.estadistica();
    res.status(200).json({estado: 'OK', datos: estadistica});
}

module.exports = {
    estadistica
}