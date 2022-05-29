const express = require('express');
const router = express.Router();

const { getGerentes, getGerentebyId } = require('../controllers/gerenteController')
router.get('/',(req,res)=>{
    res.render('index');
})

router.get('/getGerentes',(req,res)=>{
    getGerentes(gerentes=>{
        res.send(gerentes);
    })
})

router.get('/getGerente/:idGerente',(req,res)=>{
    const {idGerente} = req.params;
    getGerentebyId(idGerente,gerente=>{
        if(gerente==-1)
            res.send({err:'No existe un gerente con esa id'});
        else
            res.send(gerente);
    })
})

module.exports = router;