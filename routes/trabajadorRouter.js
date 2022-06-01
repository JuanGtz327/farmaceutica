const express = require('express');
const { getProductobyId, updateProductoCantidad, getProductos } = require('../controllers/productoController');
const router = express.Router();

const { crearTicket, addProductoTOTicket, getTicketbyId, cerrarTicket, getTicketTotalbyId, getProductoInTicketbyId, removeProductoTicket, updateProductoTOTicket, getTicketsByid, setTicketTotal } = require('../controllers/ticketController');
const { getParsedDate } = require('../helpers/extras');

const {trabAuth} = require('../helpers/auth');

router.get('/:idTrab',trabAuth,(req,res)=>{
    const {idTrab} = req.params;
    res.render('index',{idTrab});
})

router.get('/crearTicket/:idTrab',trabAuth, (req, res) => {
    const { idTrab } = req.params;
    let date = new Date();
    let output = date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');
    crearTicket(idTrab, output, data => {
        //res.send({ msg: 'Ticket creado' });
        res.redirect(`/trabajador/getTickets/${idTrab}`)
    });
});

router.get('/addtoTicket/:idTicket/:idProd/:idTrab',trabAuth, (req, res) => {
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

router.post('/addtoTicket/:idTicket/:idTrab',trabAuth, (req, res) => {
    const { idTrab,idTicket } = req.params;
    const { idProd, Cantidad } = req.body;
    addProductoTOTicket(req.body, data => {
        getProductobyId(idProd, producto => {
            let nuevaCantidad = producto[0].Cantidad - Cantidad;
            updateProductoCantidad(nuevaCantidad, idProd, data => {
                //res.send({ msg: 'Producto añadido al carrito' })
                getTicketTotalbyId(idTicket, ticket => {
                    setTicketTotal(idTicket, ticket[0].Total, data => {
                        //res.send({ msg: 'Ticket cerrado' });
                        res.redirect(`/trabajador/getTickets/${idTrab}`)
                    });
                });
            });
        });
    });
});

router.post('/deletefromTicket/:idTicket/:idProd/:idTrab',trabAuth, (req, res) => {
    const { idTrab,idProd,idTicket } = req.params;
    getProductobyId(idProd, producto => {
        getProductoInTicketbyId(idProd,idTicket, productoTicket =>{
            removeProductoTicket(idProd,idTicket,data=>{
                let nuevaCantidad = producto[0].Cantidad + productoTicket[0].cantidad;
                updateProductoCantidad(nuevaCantidad,idProd,data=>{
                    getTicketTotalbyId(idTicket, ticket => {
                        let totalFinal = ticket[0].Total==null?0:ticket[0].Total;
                        setTicketTotal(idTicket,totalFinal, data => {
                            res.redirect(`/trabajador/getTickets/${idTrab}`)
                        });
                    });
                });
            });
        });
    });
});

router.post('/updatefromTicket/:idTicket/:idProd/:idTrab',trabAuth, (req, res) => {
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
                    getTicketTotalbyId(idTicket, ticket => {
                        setTicketTotal(idTicket, ticket[0].Total, data => {
                            //res.send({ msg: 'Ticket cerrado' });
                            res.redirect(`/trabajador/getTickets/${idTrab}`)
                        });
                    });
                });
            })
        });
    });  
});

router.get('/getTicket/:idTicket/:idTrab',trabAuth, (req, res) => {
    const { idTrab, idTicket } = req.params;
    getTicketsByid(idTrab, tickets => {
        tickets.map(ticket=>{ 
            ticket.Fecha=getParsedDate(ticket.Fecha.toString());
            ticket.Cerrado==1?ticket.Cerrado=true:ticket.Cerrado=false;
        });
        getTicketbyId(idTicket, ticket => {
            const detTicket = ticket;
            let isClosed = detTicket[0].Cerrado==1?true:false; 
            getTicketTotalbyId(idTicket,totalTick=>{
                let totalTicket = totalTick[0].Total;
                res.render('tickets',{tickets,idTrab,detTicket,idTicket,totalTicket,isClosed});
            })
        });
    });
});

router.get('/getTickets/:idTrab',trabAuth, (req, res) => {
    const { idTrab } = req.params;
    getTicketsByid(idTrab, tickets => {
        //res.send(tickets);
        tickets.map(ticket=>{
            ticket.Fecha=getParsedDate(ticket.Fecha.toString());
            ticket.Cerrado==1?ticket.Cerrado=true:ticket.Cerrado=false;
        });
        res.render('tickets',{tickets,idTrab})
    });
});

router.post('/closeTicket/:idTicket/:idTrab',trabAuth, (req, res) => {
    const { idTrab, idTicket } = req.params;
    cerrarTicket(idTicket, data => {
        //res.send({ msg: 'Ticket cerrado' });
        res.redirect(`/trabajador/getTickets/${idTrab}`)
    });
});

router.get('/getProductos/:idTicket/:idTrab',trabAuth, (req, res) => {
    const { idTrab,idTicket } = req.params;
    getProductos(productos => {
        //res.send(productos);
        productos.map(producto=>producto.Fecha_caducidad=getParsedDate(producto.Fecha_caducidad.toString()));
        res.render('productosTrab',{productos,idTrab,idTicket})
    })
});

module.exports = router;