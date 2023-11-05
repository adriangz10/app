const passport = require('passport');
const passportJWT = require("passport-jwt");
const usuarioBD = require('./../basedeDatos/usuarioBD');
require('dotenv').config();

const ExtractJWT = passportJWT.ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = passportJWT.Strategy;

//Defino como se validan los usuarios en la estrategia local
passport.use(new LocalStrategy({
        usernameField: 'correoElectronico',
        passwordField: 'clave'
    }, 
    async (correoElectronico, clave, cb) => {
        try {
            const usuario = await usuarioBD.buscarUser(correoElectronico, clave); 
            if (!usuario) {
                return cb(null, false, { message: 'Nombre de usuario y/o contraseña incorrectos.' });
            } else {
                return cb(null, usuario, { message: 'Login correcto!' });
            }
        } catch (exc) {
            cb(exc);
        }
    }
));

//Acá definimos como se validan los tokens
passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET 
}, async (jwtPayload, cb) => {
        // console.log(jwtPayload)
        const usuario = await usuarioBD.buscarUserPorId(jwtPayload.idUsuario); 
        if (usuario) {
            return cb(null, usuario);
        } else {
            return cb(null, false, { message: 'Token incorrecto.' });
        }
    }
));

