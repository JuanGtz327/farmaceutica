const express = require('express');
const router = express.Router();

const { insertProducto, getProductos, getProductobyId, updateProducto, deleteProducto } = require('../controllers/productoController');
const { getTotalTickets } = require('../controllers/ticketController');
const { getTrabajadores, getTrabajadorbyNSS, insertTrabajador, updateTrabajador, deleteTrabajador } = require('../controllers/trabajadorController');

//PRODUCTOS
router.get('/getProductos/:idGer', (req, res) => {
    const { idGer } = req.params;
    getProductos(productos => {
        //res.send(productos);
        res.render('productos',{idGer,productos});
    });
});

router.get('/getProducto/:idProd/:idGer', (req, res) => {
    const { idProd, idGer } = req.params;
    getProductobyId(idProd, producto => {
        res.send(producto);
    });
});

router.post('/addProducto/:idGer', (req, res) => {
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

router.get('/updateProducto/:idProd/:idGer', (req, res) => {
    const { idProd, idGer } = req.params;
    getProductos(productos => {
        getProductobyId(idProd, producto => {
            const prodEdit = producto[0];
            res.render('productos',{idGer,prodEdit,productos});
        });
    });
});

router.post('/updateProducto/:idProd/:idGer', (req, res) => {
    const { idProd, idGer } = req.params;
    updateProducto(req.body, idGer, idProd, data => {
        //res.send({ msg: 'Producto actualizado' });
        res.redirect(`/gerente/getProductos/${idGer}`);
    })
});

router.get('/deleteProducto/:idProd/:idGer', (req, res) => {
    const { idProd, idGer } = req.params;
    getProductos(productos => {
        getProductobyId(idProd, producto => {
            const prodDel = producto[0];
            res.render('productos',{idGer,prodDel,productos});
        });
    });
});

router.post('/deleteProducto/:idProd/:idGer', (req, res) => {
    const { idProd, idGer } = req.params;
    deleteProducto(idProd, data => {
        //res.send({ msg: 'Producto eliminado' });
        res.redirect(`/gerente/getProductos/${idGer}`);
    });
});

//TRABAJADOR
router.get('/getTrabajadores/:idGer', (req, res) => {
    const { idGer } = req.params;
    getTrabajadores(trabajadores => {
        //res.send(trabajadores);
        res.render('trabajadores',{trabajadores,idGer});
    })
});

router.get('/getTrabajador/:idTrab/:idGer', (req, res) => {
    const { idTrab, idGer } = req.params;
    getTrabajadorbyNSS(idTrab, trabajador => {
        res.send(trabajador);
    });
});

router.post('/addTrabajador/:idGer', (req, res) => {
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

router.get('/updateTrabajador/:idTrab/:idGer', (req, res) => {
    const { idTrab, idGer } = req.params;
    getTrabajadores(trabajadores => {
        getTrabajadorbyNSS(idTrab, trabajador => {
            const trabEdit = trabajador[0];
            res.render('trabajadores',{idGer,trabEdit,trabajadores});
        });
    });
});

router.post('/updateTrabajador/:idTrab/:idGer', (req, res) => {
    const { idTrab, idGer } = req.params;
    updateTrabajador(req.body, idGer, idTrab, data => {
        //res.send({ msg: 'trabajador actualizado' });
        res.redirect(`/gerente/getTrabajadores/${idGer}`);
    })
});

router.get('/deleteTrabajador/:idTrab/:idGer', (req, res) => {
    const { idTrab, idGer } = req.params;
    getTrabajadores(trabajadores => {
        getTrabajadorbyNSS(idTrab, trabajador => {
            const trabDel = trabajador[0];
            res.render('trabajadores',{idGer,trabDel,trabajadores});
        });
    });
});

router.post('/deleteTrabajador/:idTrab/:idGer', (req, res) => {
    const { idTrab, idGer } = req.params;
    deleteTrabajador(idTrab, data => {
        //res.send({ msg: 'trabajador eliminado' });
        res.redirect(`/gerente/getTrabajadores/${idGer}`);
    });
});

//GANANCIAS
router.get('/getGanancias/:idGer', (req, res) => {
    const { idGer } = req.params;
    const actDate = new Date(Date.now()).toISOString().substring(0, 10);
    getTotalTickets(actDate, total => {
        //res.send({ msg: `Total de la venta actual ${total[0].Total}` });
        let msg = `Total de la venta actual $${total[0].Total}`;
        res.render('ganancias',{msg})
    });
});

module.exports = router;