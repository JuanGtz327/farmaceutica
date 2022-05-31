const express = require('express');
const { getProductobyId, updateProductoCantidad, getProductos } = require('../controllers/productoController');
const router = express.Router();

const { crearTicket, addProductoTOTicket, getTicketbyId, cerrarTicket, getTicketTotalbyId, getProductoInTicketbyId, removeProductoTicket, updateProductoTOTicket, getTicketsByid } = require('../controllers/ticketController');
const { getParsedDate } = require('../helpers/extras');

router.get('/crearTicket/:idTrab', (req, res) => {
    const { idTrab } = req.params;
    const actDate = new Date(Date.now()).toISOString().substring(0, 10);
    crearTicket(idTrab, actDate, data => {
        res.send({ msg: 'Ticket creado' });
    });
});

router.get('/addtoTicket/:idTicket/:idProd/:idTrab', (req, res) => {
    const { idTrab,idProd,idTicket } = req.params;
    getProductos(productos => {
        getProductobyId(idProd,producto=>{
            productos.map(producto=>producto.Fecha_caducidad=getParsedDate(producto.Fecha_caducidad.toString()));
            let readyAdd = true;
            let detProd = producto[0];
            res.render('productosTrab',{productos,idTrab,readyAdd,detProd,idTicket})
        })
    })
});

router.post('/addtoTicket/:idTrab', (req, res) => {
    const { idTrab } = req.params;
    const { idProd, Cantidad } = req.body;
    addProductoTOTicket(req.body, data => {
        getProductobyId(idProd, producto => {
            let nuevaCantidad = producto[0].Cantidad - Cantidad;
            updateProductoCantidad(nuevaCantidad, idProd, data => {
                //res.send({ msg: 'Producto añadido al carrito' })
                res.redirect(`/trabajador/getTickets/${idTrab}`)
            });
        });
    });
});

router.post('/deletefromTicket/:idTicket/:idProd/:idTrab', (req, res) => {
    const { idTrab,idProd,idTicket } = req.params;
    getProductobyId(idProd, producto => {
        getProductoInTicketbyId(idProd,idTicket, productoTicket =>{
            removeProductoTicket(idProd,idTicket,data=>{
                let nuevaCantidad = producto[0].Cantidad + productoTicket[0].cantidad;
                updateProductoCantidad(nuevaCantidad,idProd,data=>{
                    //res.send({msg:'Producto eliminado del carrito'});
                    res.redirect(`/trabajador/getTickets/${idTrab}`)
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
        getProductoInTicketbyId(idProd,idTicket, productoTicket =>{
            updateProductoTOTicket(detalle,data=>{
                let nuevaCantidad;
                if(Cantidad>=productoTicket[0].cantidad){
                    nuevaCantidad = producto[0].Cantidad - (Cantidad-productoTicket[0].cantidad);
                }else{
                    nuevaCantidad = producto[0].Cantidad + (productoTicket[0].cantidad-Cantidad);
                }
                updateProductoCantidad(nuevaCantidad, idProd, data => {
                    res.redirect(`/trabajador/getTickets/${idTrab}`)
                });
            })
        });
    });
    
});

router.get('/getTicket/:idTicket/:idTrab', (req, res) => {
    const { idTrab, idTicket } = req.params;
    getTicketsByid(idTrab, tickets => {
        tickets.map(ticket=>{ ticket.Fecha=getParsedDate(ticket.Fecha.toString());});
        getTicketbyId(idTicket, ticket => {
            const detTicket = ticket;
            getTicketTotalbyId(idTicket,totalTick=>{
                let totalTicket = totalTick[0].Total;
                res.render('tickets',{tickets,idTrab,detTicket,idTicket,totalTicket});
            })
        });
    });
});

router.get('/getTickets/:idTrab', (req, res) => {
    const { idTrab } = req.params;
    getTicketsByid(idTrab, tickets => {
        //res.send(tickets);
        tickets.map(ticket=>{ ticket.Fecha=getParsedDate(ticket.Fecha.toString());});
        res.render('tickets',{tickets,idTrab})
    });
});

router.post('/closeTicket/:idTicket/:idTrab', (req, res) => {
    const { idTrab, idTicket } = req.params;
    getTicketTotalbyId(idTicket, ticket => {
        cerrarTicket(idTicket, ticket[0].Total, data => {
            //res.send({ msg: 'Ticket cerrado' });
            res.redirect(`/trabajador/getTickets/${idTrab}`)
        });
    });
});

router.get('/getProductos/:idTicket/:idTrab', (req, res) => {
    const { idTrab,idTicket } = req.params;
    getProductos(productos => {
        //res.send(productos);
        productos.map(producto=>producto.Fecha_caducidad=getParsedDate(producto.Fecha_caducidad.toString()));
        res.render('productosTrab',{productos,idTrab,idTicket})
    })
});

module.exports = router;