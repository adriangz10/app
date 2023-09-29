const express = require('express');
const nodemailer = require('nodemailer');

//cors
const cors = require('cors');

// ESTO NO SE VIO EN CLASES
// para loguear las peticiones que recibe el servidor
var morgan = require('morgan')
//para trabajar con el sistema de archivos: crear leer etc archivos
var fs = require('fs')
// trabajar con las rutas de archivos y directorios del sistema de archivos
var path = require('path')

const handlebars = require('handlebars');

const mysql = require('mysql2');


require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use(cors());

//console.log(process.env)

// ESTO NO SE VIO EN CLASES
// descomentar y mirar lo que muestra la consola en cada solicitud (get o post) que recibe el servidor
// app.use(morgan('dev')); 

// CREA UN ARCHIVO DE ACCESO
// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
// setup the logger
app.use(morgan('combined', { stream: accessLogStream }))

app.get('/', (req, res)=>{
    //const saludo = 'Bienvenido a prog 3';
    const saludo = {estado:true, mensaje:'Bienvenido'}
    res.status(200).json({saludo});
});

//definimos las rutas del api
const v1Publico = require('./v1/rutas/publico');
const v1Estudiante = require('./v1/rutas/estudiante');

//definimos los middlewares
app.use('/api/v1/publico', v1Publico);
app.use('/api/v1/estudiante', v1Estudiante);


app.listen(process.env.PUERTO, ()=>{
    console.log('API Prog3 iniciada, ' + process.env.PUERTO);
})