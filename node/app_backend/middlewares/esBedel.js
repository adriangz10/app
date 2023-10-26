require('dotenv').config();

const esBedel = async(req, res, next) =>{
    
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; //el token es enviado usando Bearer

    if(!token){
        return res.sendStatus(401); //no autrizado
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, usuario) =>{
        if(err) {
            return res.status(403).send({status: 'FALLO', data: {error: "Token invalido." } }); //respuesta al token invalido 
        }

        const data = await usuarioBD.buscarPorId(usuario.idUsuario);

        //bedel tipo = 1, decano tipo = 0.
        if(data.tipoUsuario != 1){
            return res.status(403).send({status: 'FALLO', data:{error: "No tiene los privilegios necesarios"} })
        }

        next();
    });
}

module.exports = {
    esBedel
}