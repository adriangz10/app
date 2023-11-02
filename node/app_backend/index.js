const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
var morgan = require('morgan')
var fs = require('fs')
var path = require('path')
const handlebars = require('handlebars');
const mysql = require('mysql2');
require('dotenv').config();


const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors());

//Configuración del passport
const passport = require('passport');
require('./config/passport');


// CREA UN ARCHIVO DE ACCESO
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
app.use(morgan('combined', { stream: accessLogStream }))

app.get('/', (req, res)=>{
    const saludo = {estado:true, mensaje:'Bienvenido'}
    res.status(200).json({saludo});
});

//ruta para acceder a los archivos de imagenes "archivos/imagenes" 
app.get('/archivos/:nombreArchivo', (req, res)=>{
     const nombreArchivo = req.params.nombreArchivo;
     res.sendFile(path.join(__dirname, "archivos", nombreArchivo));
 })



//definimos las rutas del api
//Públicas 
const v1Publico = require('./v1/rutas/publico');
const v1Auth = require('./v1/rutas/auth');


//acá no recuerdo pero es necesario para determinar que usuario entra en qué ruta...
//por ende, acá debería ir {esDecano} después.
const { esBedel } = require('./middlewares/esBedel');
const { esDecano } = require('./middlewares/esDecano');


//Privadas
const v1Estudiante = require('./v1/rutas/estudiante');
const v1Materia = require('./v1/rutas/materia');
const v1Carrera = require('./v1/rutas/carrera');
const v1Inscripcion = require('./v1/rutas/inscripcion');
const v1EstudianteCarrera = require('./v1/rutas/estudianteCarrera');
const v1EstudianteMateria = require('./v1/rutas/estudianteMateria');
const v1CarreraMateria = require('./v1/rutas/carreraMateria');
//const v1Estadistica = require('./v1/rutas/estadistica');

//definimos los middlewares
app.use('/api/v1/publico', v1Publico);
app.use('/api/v1/auth', v1Auth);

//middlewares, definimos qué user entra en qué ruta
//app.use('/api/v1/estudiante', [passport.authenticate('jwt', {session: false}), esBedel], v1Estudiante);
//app.use('/api/v1/materia', v1Materia [passport.authenticate('jwt', {session: false}), esBedel], v1Materia);
//app.use('/api/v1/carrera', [passport.authenticate('jwt', {session: false}), esBedel], v1Carrera );
app.use('/api/v1/estudianteCarrera', v1EstudianteCarrera);
app.use('/api/estudianteMateria', v1EstudianteMateria);
app.use('/api/carreraMateria', v1CarreraMateria);
app.use('/api/v1/inscripcion', v1Inscripcion);


//app.use('/api/v1/estadistica', [passport.authenticate('jwt', {session: false}), esDecano], v1Estadistica);



app.listen(process.env.PUERTO, ()=>{
    console.log('API Prog3 iniciada, ' + process.env.PUERTO);
})