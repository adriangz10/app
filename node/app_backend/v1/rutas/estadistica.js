const Router = require('express');
const { estadistica } = require('../../controladores/estadistica');

const router = Router();


router
    .get('/estadisticas', estadistica)
    

module.exports= router;