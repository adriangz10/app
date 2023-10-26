const jwt = require('jsonwebtoken');
const passport = require('passport');
require('dotenv').config();

//función de login con autenticación local del passport
const login = async(req, res) =>{
    passport.authenticate('local', {session: false}, (err, usuario, info) =>{
        if(err || usuario){
            return res.status(400).json({estado: 'FALLO', msj: info});
        }
        //si existe el usuario, definimos como firmamos
        //(frase de paso o )
        req.login(usuario, {session: false}, (err)=>{
            if(err){
                res.send(err);
            }
            
            const token = jwt.sign(usuario, process.env.JWT_SECRET);
            return res.json({usuario, token});
        });
    })(req, res); 
}

module.exports = {login}