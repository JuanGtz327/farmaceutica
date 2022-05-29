const express = require('express');
const { getProductobyId, updateProductoCantidad, getProductos } = require('../controllers/productoController');
const router = express.Router();

const { crearTicket, addProductoTOTicket, getTicketbyId, cerrarTicket, getTicketTotalbyId, getProductoInTicketbyId, removeProductoTicket, updateProductoTOTicket } = require('../controllers/ticketController');

router.get('/crearTicket/:idTrab', (req, res) => {
    const { idTrab } = req.params;
    const actDate = new Date(Date.now()).toISOString().substring(0, 10);
    crearTicket(idTrab, actDate, data => {
        res.send({ msg: 'Ticket creado' });
    });
});

router.post('/addtoTicket/:idTrab', (req, res) => {
    const { idTrab } = req.params;
    const { idProd, Cantidad } = req.body;
    addProductoTOTicket(req.body, data => {
        getProductobyId(idProd, producto => {
            let nuevaCantidad = producto[0].Cantidad - Cantidad;
            updateProductoCantidad(nuevaCantidad, idProd, data => {
                res.send({ msg: 'Producto añadido al carrito' })
            });
        });
    });
});

router.post('/deletefromTicket/:idProd/:idTrab', (req, res) => {
    const { idTrab,idProd } = req.params;
    getProductobyId(idProd, producto => {
        getProductoInTicketbyId(idProd, productoTicket =>{
            removeProductoTicket(idProd,data=>{
                let nuevaCantidad = producto[0].Cantidad + productoTicket[0].cantidad;
                updateProductoCantidad(nuevaCantidad,idProd,data=>{
                    res.send({msg:'Producto eliminado del carrito'});
                });
            });
        });
    });
});

router.post('/updatefromTicket/:idProd/:idTrab', (req, res) => {
    const { idTrab,idProd } = req.params;
    const { idTicket, Cantidad } = req.body;
    const detalle = {Cantidad,idProd,idTicket};
    getProductobyId(idProd, producto => {
        getProductoInTicketbyId(idProd, productoTicket =>{
            updateProductoTOTicket(detalle,data=>{
                let nuevaCantidad;
                if(Cantidad>=productoTicket[0].cantidad){
                    nuevaCantidad = producto[0].Cantidad - (Cantidad-productoTicket[0].cantidad);
                }else{
                    nuevaCantidad = producto[0].Cantidad + (productoTicket[0].cantidad-Cantidad);
                }
                updateProductoCantidad(nuevaCantidad, idProd, data => {
                    res.send({ msg: 'Producto del carrito actualizado' })
                });
            })
        });
    });
    
});

router.get('/getTicket/:idTicket/:idTrab', (req, res) => {
    const { idTrab, idTicket } = req.params;
    getTicketbyId(idTicket, ticket => {
        res.send(ticket);
    });
});

router.post('/closeTicket/:idTicket/:idTrab', (req, res) => {
    const { idTrab, idTicket } = req.params;
    getTicketTotalbyId(idTicket, ticket => {
        cerrarTicket(idTicket, ticket[0].Total, data => {
            res.send({ msg: 'Ticket cerrado' });
        });
    });
});

router.get('/getProductos/:idTrab', (req, res) => {
    const { idTrab } = req.params;
    getProductos(productos => {
        res.send(productos);
    })
});

module.exports = router;