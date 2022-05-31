const connection = require('../db/db');

const crearTicket = (idTrab,fecha,callback)=>{
    connection.query('INSERT INTO Ticket SET Fecha=?,NSS=?,Total_pagar=?',[fecha,idTrab,0],(error, results, fields)=>{
        if(error){
            console.log(error);
            callback(-1,error.code);
        }else{
            callback(`Added ${results.affectedRows} rows`);
        }
    });
};

const cerrarTicket = (idTicket,callback)=>{
    connection.query('UPDATE Ticket SET Cerrado=? WHERE id_ticket=?',[1,idTicket],(error, results, fields)=>{
        if(error){
            console.log(error);
            callback(-1,error.code);
        }else{
            callback(`Added ${results.affectedRows} rows`);
        }
    });
};

const setTicketTotal = (idTicket,total,callback)=>{
    connection.query('UPDATE Ticket SET Total_pagar=? WHERE id_ticket=?',[total,idTicket],(error, results, fields)=>{
        if(error){
            console.log(error);
            callback(-1,error.code);
        }else{
            callback(`Added ${results.affectedRows} rows`);
        }
    });
};

const getTicketsByid = (idTrab,callback)=>{
    connection.query('SELECT * FROM Ticket WHERE NSS=?',idTrab, (error, results, fields)=>{
        if (error) throw error;
        callback(results);
    });
}

const getTicketbyId = (idTicket,callback)=>{
    connection.query("SELECT p.id_producto,p.Nombre,d.cantidad,t.Cerrado,p.Precio_venta*d.cantidad as 'Total' FROM detalletiket d, producto p JOIN Ticket t where d.id_ticket=t.id_ticket and p.id_producto=d.id_producto and t.id_ticket=?",idTicket, (error, results, fields)=>{
        if (error) throw error;
        callback(results);
    });
}

const getTicketTotalbyId = (idTicket,callback)=>{
    connection.query("SELECT sum(p.Precio_venta*d.cantidad) as 'Total' FROM detalletiket d, producto p JOIN Ticket t where d.id_ticket=t.id_ticket and p.id_producto=d.id_producto and t.id_ticket=?",idTicket, (error, results, fields)=>{
        if (error) throw error;
        callback(results);
    });
}

const addProductoTOTicket = (detalle,callback)=>{
    const {idProd,Cantidad,idTicket} = detalle;
    connection.query('INSERT INTO Detalletiket SET id_producto=?,cantidad=?,id_ticket=?',[idProd,Cantidad,idTicket],(error, results, fields)=>{
        if(error){
            console.log(error);
            callback(-1,error.code);
        }else{
            callback(`Added ${results.affectedRows} rows`);
        }
    });
};

const updateProductoTOTicket = (detalle,callback)=>{
    const {idProd,Cantidad,idTicket} = detalle;
    connection.query('UPDATE Detalletiket SET cantidad=? WHERE id_producto=? AND id_ticket=?',[Cantidad,idProd,idTicket],(error, results, fields)=>{
        if(error){
            console.log(error);
            callback(-1,error.code);
        }else{
            callback(`Added ${results.affectedRows} rows`);
        }
    });
};

const removeProductoTicket = (idProd,id_ticket,callback)=>{
    connection.query('DELETE FROM Detalletiket WHERE id_producto=? and id_ticket=?',[idProd,id_ticket],(error, results, fields)=>{
        if(error){
            console.log(error);
            callback(-1,error.code);
        }else{
            callback(`Added ${results.affectedRows} rows`);
        }
    });
};

const getProductoInTicketbyId = (idProd,id_ticket,callback)=>{
    connection.query("SELECT * FROM Detalletiket WHERE id_producto=? and id_ticket=?",[idProd,id_ticket], (error, results, fields)=>{
        if (error) throw error;
        callback(results);
    });
}

const getTotalTickets = (fecha,callback)=>{
    connection.query("SELECT sum(Total_pagar) as 'Total' FROM Ticket WHERE Fecha=? and Cerrado=?",[fecha,1], (error, results, fields)=>{
        if (error) throw error;
        callback(results);
    });
}

module.exports = {
    crearTicket,
    addProductoTOTicket,
    getTicketbyId,
    getTicketTotalbyId,
    getTicketsByid,
    cerrarTicket,
    removeProductoTicket,
    getProductoInTicketbyId,
    updateProductoTOTicket,
    getTotalTickets,
    setTicketTotal
}