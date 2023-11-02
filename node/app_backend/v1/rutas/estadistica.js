const Router = require('express');

const router = Router();

const { estadistica, estadistica2 } = require('/controladores/estadistica')

router
    .get('/estadistica', estadistica)
    .get('/estadistica', estadistica2);

    module.exports= {

}