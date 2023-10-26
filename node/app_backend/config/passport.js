const passport = require('passport');
const passportJWT = require('passport-jwt');
const usuarioBD = require('./../basedeDatos/usuarioBD');
require('dotenv').config();

//lo dejo si lo comenta
const ExtractJWT = passportJWT.ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = passportJWT.Strategy;

//define como se validan los usuarios con la estrategia local
passport.use(new LocalStrategy({
    userNameField: 'correoElectronico',
    passwordField: 'clave'
}, //función para validar al usuario (CE y clave)
async (correoElectronico, clave, cb) =>{
    try{
        const usuario = await usuarioBD.buscar(correoElectonico, clave);
        if(!usuario){
            return cb(null, false, {message: 'Nombre de usuario o contraseña incorrectos.'})
        }else{
            return cb(null, usuario, {message: 'Login correcto'});
        }
    }catch(exec){
        cb(exec);
    }
}
));

//Definir como se validan los tokens recibidos
passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET //contraseña con la que se firma el token
}, //passport decodifica el token utilizando la contraseña y deja los datos en jwtPayload
    async (jwtPayload, cb) =>{
        //esto no se va cumplir hasta que no haga la función buscar por id
        const usuario = await usuarioBD.buscarPorId(jwtPayload.idUsuario); //buscar usuario por ID 
        if(usuario){
            return cb(null, usuario);
        }else{
            return cb(null, false, {message: 'Token incorrecto.'});
        }
    }
)) 

