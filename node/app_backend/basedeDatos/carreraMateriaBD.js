const conexion = require('./conexionBD');

//TODO Falta testeo!!! --Mario

const carreraMateriaPorIdMateria = async(idMateria)=>{

    const consulta = `SELECT m.nombre. m.horasSemanales, 
            (CASE 
                WHEN tipoMateria = 0 THEN 'anual'
                WHEN tipoMateria = 1 THEN 'cuatrimestral'
                END) AS m.tipoMateria
                FROM materia AS m 
                INNER JOIN carreraMateria AS cm
                ON cm.materia = m.idMateria
                WHERE m.activo = 1 AND cm.materia =?`;

    const [carreraMateria] = await conexion.query(consulta, [idMateria]);

    return carreraMateria;
 }

const borrarPorIdCarrera = async (cn,idCarrera) => {

    const consulta = 'DELETE FROM carreraMateria WHERE carrera = ?;';
    const [result] = await cn.query(consulta, idCarrera);
    
    return result;
}
const nuevaMateria =  async(idCarrera,materias) => {
    const cn = await conexion.getConnection();

    try {
        await cn.beginTransaction();
 
        await borrarPorIdCarrera(cn,idCarrera);
        
        materias.forEach(async element => {
            const dato = {carrera:idCarrera, materias:element}
            const consulta = 'INSERT INTO carreraMaterias SET ?';
            const [result] = await cn.query(consulta, dato);
        })

        await cn.commit();
    } catch (error) {
        await cn.rollback();
        throw error;
    } finally {
        cn.release();
    }
}

module.exports={
    carreraMateriaPorIdMateria,
    borrarPorIdCarrera,
    nuevaMateria
  
}