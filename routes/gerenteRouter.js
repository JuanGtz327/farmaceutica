const express = require('express');
const router = express.Router();

const { insertProducto, getProductos, getProductobyId, updateProducto, deleteProducto } = require('../controllers/productoController');
const { getTotalTickets } = require('../controllers/ticketController');
const { getTrabajadores, getTrabajadorbyNSS, insertTrabajador, updateTrabajador, deleteTrabajador } = require('../controllers/trabajadorController');

//PRODUCTOS
router.get('/getProductos/:idGer', (req, res) => {
    const { idGer } = req.params;
    getProductos(productos => {
        res.send(productos);
    })
});

router.get('/getProducto/:idProd/:idGer', (req, res) => {
    const { idProd, idGer } = req.params;
    getProductobyId(idProd, producto => {
        res.send(producto);
    });
});

router.get('/addProducto/:idGer', (req, res) => {
    const { idGer } = req.params;

});

router.post('/addProducto/:idGer', (req, res) => {
    const { idGer } = req.params;
    insertProducto(req.body, idGer, (data, err) => {
        if (data == -1) {
            res.send({ err })
        } else {
            res.send({ msg: 'Producto Insertado' });
        }
    })
});

router.get('/updateProducto/:idProd/:idGer', (req, res) => {
    const { idProd, idGer } = req.params;

});

router.post('/updateProducto/:idProd/:idGer', (req, res) => {
    const { idProd, idGer } = req.params;
    updateProducto(req.body, idGer, idProd, data => {
        res.send({ msg: 'Producto actualizado' });
    })
});

router.post('/deleteProducto/:idProd/:idGer', (req, res) => {
    const { idProd, idGer } = req.params;
    deleteProducto(idProd, data => {
        res.send({ msg: 'Producto eliminado' });
    });
});

//TRABAJADOR
router.get('/getTrabajadores/:idGer', (req, res) => {
    const { idGer } = req.params;
    getTrabajadores(trabajadores => {
        res.send(trabajadores);
    })
});

router.get('/getTrabajador/:idTrab/:idGer', (req, res) => {
    const { idTrab, idGer } = req.params;
    getTrabajadorbyNSS(idTrab, trabajador => {
        res.send(trabajador);
    });
});

router.get('/addTrabajador/:idGer', (req, res) => {
    const { idGer } = req.params;

});

router.post('/addTrabajador/:idGer', (req, res) => {
    const { idGer } = req.params;
    insertTrabajador(req.body, idGer, (data, err) => {
        if (data == -1) {
            res.send({ err })
        } else {
            res.send({ msg: 'trabajador Insertado' });
        }
    })
});

router.get('/updateTrabajador/:idTrab/:idGer', (req, res) => {
    const { idProd, idGer } = req.params;

});

router.post('/updateTrabajador/:idTrab/:idGer', (req, res) => {
    const { idTrab, idGer } = req.params;
    updateTrabajador(req.body, idGer, idTrab, data => {
        res.send({ msg: 'trabajador actualizado' });
    })
});

router.post('/deleteTrabajador/:idTrab/:idGer', (req, res) => {
    const { idTrab, idGer } = req.params;
    deleteTrabajador(idTrab, data => {
        res.send({ msg: 'trabajador eliminado' });
    });
});

//GANANCIAS
router.get('/getGanancias/:idGer', (req, res) => {
    const { idGer } = req.params;
    const actDate = new Date(Date.now()).toISOString().substring(0, 10);
    getTotalTickets(actDate, total => {
        res.send({ msg: `Total de la venta actual ${total[0].Total}` });
    });
});

module.exports = router;