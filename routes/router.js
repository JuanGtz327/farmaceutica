const express = require('express');
const passport = require('passport');
const router = express.Router();

const { getGerentes, getGerentebyId, getGerentebyUsername } = require('../controllers/gerenteController');
const { getTrabajadorbyNSS } = require('../controllers/trabajadorController');

router.get('/',(req,res)=>{
    res.render('index');
})

router.post('/login',passport.authenticate('ger-sign',{failureRedirect: '/'}),(req,res)=>{
    const {Usuario} = req.body;
    getGerentebyUsername(Usuario,gerente=>{
        res.redirect(`/gerente/${gerente.id_administrador}`)
    });
});

router.post('/loginTrab',passport.authenticate('tra-sign',{failureRedirect: '/'}),(req,res)=>{
    const {NSS} = req.body;
    getTrabajadorbyNSS(NSS,trabajador=>{
        res.redirect(`/trabajador/${trabajador.NSS}`)
    });
});

router.get('/logout', (req, res, next)=>{
    req.logout(err=>{
        if(err){
            return next(err); 
        }
        res.redirect('/');
    });
});

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