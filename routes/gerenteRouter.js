const express = require('express');
const router = express.Router();

const { insertProducto, getProductos, getProductobyId, updateProducto, deleteProducto } = require('../controllers/productoController');
const { getTotalTickets } = require('../controllers/ticketController');
const { getTrabajadores, getTrabajadorbyNSS, insertTrabajador, updateTrabajador, deleteTrabajador } = require('../controllers/trabajadorController');
const { getParsedDate } = require('../helpers/extras');

const {gerAuth} = require('../helpers/auth');

router.get('/:idGer',gerAuth,(req,res)=>{
    const {idGer} = req.params;
    res.render('index',{idGer});
})

//PRODUCTOS
router.get('/getProductos/:idGer',gerAuth, (req, res) => {
    const { idGer } = req.params;
    getProductos(productos => {
        //res.send(productos);
        productos.map(producto=>producto.Fecha_caducidad=getParsedDate(producto.Fecha_caducidad.toString()));
        res.render('productos',{idGer,productos});
    });
});

router.get('/getProducto/:idProd/:idGer',gerAuth, (req, res) => {
    const { idProd, idGer } = req.params;
    getProductobyId(idProd, producto => {
        res.send(producto);
    });
});

router.post('/addProducto/:idGer',gerAuth, (req, res) => {
    const { idGer } = req.params;
    insertProducto(req.body, idGer, (data, err) => {
        if (data == -1) {
            res.send({ err })
        } else {
            //res.send({ msg: 'Producto Insertado' });
            res.redirect(`/gerente/getProductos/${idGer}`);
        }
    })
});

router.get('/updateProducto/:idProd/:idGer',gerAuth, (req, res) => {
    const { idProd, idGer } = req.params;
    getProductos(productos => {
        productos.map(producto=>producto.Fecha_caducidad=getParsedDate(producto.Fecha_caducidad.toString()));
        getProductobyId(idProd, producto => {
            const prodEdit = producto[0];
            prodEdit.Fecha_caducidad=prodEdit.Fecha_caducidad.toISOString().substring(0,10);
            res.render('productos',{idGer,prodEdit,productos});
        });
    });
});

router.post('/updateProducto/:idProd/:idGer',gerAuth, (req, res) => {
    const { idProd, idGer } = req.params;
    updateProducto(req.body, idGer, idProd, data => {
        //res.send({ msg: 'Producto actualizado' });
        res.redirect(`/gerente/getProductos/${idGer}`);
    })
});

router.get('/deleteProducto/:idProd/:idGer',gerAuth, (req, res) => {
    const { idProd, idGer } = req.params;
    getProductos(productos => {
        productos.map(producto=>producto.Fecha_caducidad=getParsedDate(producto.Fecha_caducidad.toString()));
        getProductobyId(idProd, producto => {
            const prodDel = producto[0];
            res.render('productos',{idGer,prodDel,productos});
        });
    });
});

router.post('/deleteProducto/:idProd/:idGer',gerAuth, (req, res) => {
    const { idProd, idGer } = req.params;
    deleteProducto(idProd, data => {
        //res.send({ msg: 'Producto eliminado' });
        res.redirect(`/gerente/getProductos/${idGer}`);
    });
});

//TRABAJADOR
router.get('/getTrabajadores/:idGer',gerAuth, (req, res) => {
    const { idGer } = req.params;
    getTrabajadores(trabajadores => {
        //res.send(trabajadores);
        trabajadores.map(trabajador=>{
            trabajador.Fecha_nacimiento=getParsedDate(trabajador.Fecha_nacimiento.toString());
            trabajador.Fecha_contrato=getParsedDate(trabajador.Fecha_contrato.toString());
        });
        res.render('trabajadores',{trabajadores,idGer});
    })
});

router.get('/getTrabajador/:idTrab/:idGer',gerAuth, (req, res) => {
    const { idTrab, idGer } = req.params;
    getTrabajadorbyNSS(idTrab, trabajador => {
        res.send(trabajador);
    });
});

router.post('/addTrabajador/:idGer',gerAuth, (req, res) => {
    const { idGer } = req.params;
    insertTrabajador(req.body, idGer, (data, err) => {
        if (data == -1) {
            res.send({ err })
        } else {
            //res.send({ msg: 'trabajador Insertado' });
            res.redirect(`/gerente/getTrabajadores/${idGer}`);
        }
    })
});

router.get('/updateTrabajador/:idTrab/:idGer',gerAuth, (req, res) => {
    const { idTrab, idGer } = req.params;
    getTrabajadores(trabajadores => {
        trabajadores.map(trabajador=>{
            trabajador.Fecha_nacimiento=getParsedDate(trabajador.Fecha_nacimiento.toString());
            trabajador.Fecha_contrato=getParsedDate(trabajador.Fecha_contrato.toString());
        });
        getTrabajadorbyNSS(idTrab, trabajador => {
            const trabEdit = trabajador;
            trabEdit.Fecha_nacimiento=trabEdit.Fecha_nacimiento.toISOString().substring(0,10);
            trabEdit.Fecha_contrato=trabEdit.Fecha_contrato.toISOString().substring(0,10);
            res.render('trabajadores',{idGer,trabEdit,trabajadores});
        });
    });
});

router.post('/updateTrabajador/:idTrab/:idGer',gerAuth, (req, res) => {
    const { idTrab, idGer } = req.params;
    updateTrabajador(req.body, idGer, idTrab, data => {
        //res.send({ msg: 'trabajador actualizado' });
        res.redirect(`/gerente/getTrabajadores/${idGer}`);
    })
});

router.get('/deleteTrabajador/:idTrab/:idGer',gerAuth, (req, res) => {
    const { idTrab, idGer } = req.params;
    getTrabajadores(trabajadores => {
        trabajadores.map(trabajador=>{
            trabajador.Fecha_nacimiento=getParsedDate(trabajador.Fecha_nacimiento.toString());
            trabajador.Fecha_contrato=getParsedDate(trabajador.Fecha_contrato.toString());
        });
        getTrabajadorbyNSS(idTrab, trabajador => {
            const trabDel = trabajador;
            res.render('trabajadores',{idGer,trabDel,trabajadores});
        });
    });
});

router.post('/deleteTrabajador/:idTrab/:idGer',gerAuth, (req, res) => {
    const { idTrab, idGer } = req.params;
    deleteTrabajador(idTrab, data => {
        //res.send({ msg: 'trabajador eliminado' });
        res.redirect(`/gerente/getTrabajadores/${idGer}`);
    });
});

//GANANCIAS
router.get('/getGanancias/:idGer',gerAuth, (req, res) => {
    const { idGer } = req.params;
    const actDate = new Date(Date.now()).toISOString().substring(0, 10);
    getTotalTickets(actDate, total => {
        //res.send({ msg: `Total de la venta actual ${total[0].Total}` });
        let msg;
        if(total==null){
            msg = `Total de la venta actual $${total[0].Total}`;
        }else{
            msg = `Aun no hay ventas generadas el dia de hoy`;
        }
        res.render('ganancias',{msg,idGer})
    });
});

router.post('/getGananciasDay/:idGer',gerAuth, (req, res) => {
    const { idGer } = req.params;
    const { Fecha } = req.body;
    getTotalTickets(Fecha, total => {
        //res.send({ msg: `Total de la venta actual ${total[0].Total}` });
        let msg;
        if(total[0].Total!=null){
            msg = `El total de la venta del dia ${Fecha} fue de $${total[0].Total}`;
        }else{
            msg = `No hay ventas generadas`;
        }
        res.render('ganancias',{msg,idGer})
    });
});

module.exports = router;