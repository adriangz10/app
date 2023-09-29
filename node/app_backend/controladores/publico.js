const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
const handlebars = require('handlebars');

exports.enviarCorreo = async (req, res) =>{
    const {nombre, correo, mensaje} = req.body;
    
    const plantillaHds2 = fs.readFileSync(path.join(__dirname, '../utiles/handlebars/plantilla.hbs'), 'utf8');
    //__dirname me manda a la carpeta utiles, si tira error
    const correoTemplate = handlebars.compile(plantillaHds2);
  
    // Datos de la plantilla
    const datos = {
      nombre: nombre,
      correo: correo,
      mensaje: mensaje
    };
  
    // Renderizo la plantilla con los datos
    const correoHtml = correoTemplate(datos);

    // console.log(correoHtml);
    const transporter = nodemailer.createTransport({
        service:'hotmail',
        auth:{
            user:process.env.CORREO,
            pass:process.env.CLAVE
        }
    })

    const opciones = {
        from : 'api-tp_prog3',
        to:'mismalop88@hotmail.com',
        subject:'titulo',
        html:correoHtml
    }

    transporter.sendMail(opciones, (error, info) => {
        if(error){
            const respuesta = 'correo no enviado';
            res.json({respuesta});
        }else{
            const respuesta = 'correo enviado';
            res.json({respuesta});
        }
    })
}