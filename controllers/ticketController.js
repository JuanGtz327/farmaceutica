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

const cerrarTicket = (idTicket,total,callback)=>{
    connection.query('UPDATE Ticket SET Total_pagar=? WHERE id_ticket=?',[total,idTicket],(error, results, fields)=>{
        if(error){
            console.log(error);
            callback(-1,error.code);
        }else{
            callback(`Added ${results.affectedRows} rows`);
        }
    });
};

const getTickets = (callback)=>{
    connection.query('SELECT * FROM Ticket', (error, results, fields)=>{
        if (error) throw error;
        callback(results);
    });
}

const getTicketbyId = (idTicket,callback)=>{
    connection.query("SELECT p.Nombre,d.cantidad,p.Precio_venta*d.cantidad as 'Total' FROM detalletiket d, producto p JOIN Ticket t where p.id_producto=d.id_producto and t.id_ticket=?",idTicket, (error, results, fields)=>{
        if (error) throw error;
        callback(results);
    });
}

const getTicketTotalbyId = (idTicket,callback)=>{
    connection.query("SELECT sum(p.Precio_venta*d.cantidad) as 'Total' FROM detalletiket d, producto p JOIN Ticket t where p.id_producto=d.id_producto and t.id_ticket=?",idTicket, (error, results, fields)=>{
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

const removeProductoTicket = (idProd,callback)=>{
    connection.query('DELETE FROM Detalletiket WHERE id_producto=?',[idProd],(error, results, fields)=>{
        if(error){
            console.log(error);
            callback(-1,error.code);
        }else{
            callback(`Added ${results.affectedRows} rows`);
        }
    });
};

const getProductoInTicketbyId = (idProd,callback)=>{
    connection.query("SELECT * FROM Detalletiket WHERE id_producto=?",idProd, (error, results, fields)=>{
        if (error) throw error;
        callback(results);
    });
}

const getTotalTickets = (fecha,callback)=>{
    connection.query("SELECT sum(Total_pagar) as 'Total' FROM Ticket WHERE Fecha=?",fecha, (error, results, fields)=>{
        if (error) throw error;
        callback(results);
    });
}

module.exports = {
    crearTicket,
    addProductoTOTicket,
    getTicketbyId,
    getTicketTotalbyId,
    getTickets,
    cerrarTicket,
    removeProductoTicket,
    getProductoInTicketbyId,
    updateProductoTOTicket,
    getTotalTickets
}