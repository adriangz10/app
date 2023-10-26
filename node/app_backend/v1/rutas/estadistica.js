const Router = require('express');

router = Router();

const { estadistica } = require('/controladores/estadistica')

router.get('/estadistica', estadistica);

module.exports= {

}