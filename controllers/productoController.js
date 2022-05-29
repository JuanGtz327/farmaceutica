const connection = require('../db/db');

const getProductos = (callback)=>{
    connection.query('SELECT * FROM Producto', (error, results, fields)=>{
        if (error) throw error;
        callback(results);
    });
}

const getProductobyId = (idProd,callback)=>{
    connection.query("SELECT * FROM Producto WHERE id_producto=?",idProd, (error, results, fields)=>{
        if (error) throw error;
        callback(results);
    });
}

const insertProducto = (producto,idGer,callback)=>{
    const {Nombre,Cantidad,Gramaje,Costo,Precio_venta,Descripcion,Fecha_caducidad} = producto;
    connection.query('INSERT INTO Producto SET Nombre=?,Cantidad=?,Gramaje=?,Costo=?,Precio_venta=?,Descripcion=?,Fecha_caducidad=?,id_administrador=?',[Nombre,Cantidad,Gramaje,Costo,Precio_venta,Descripcion,Fecha_caducidad,idGer],(error, results, fields)=>{
        if(error){
            callback(-1,error.code);
        }else{
            callback(`Added ${results.affectedRows} rows`);
        }
    });
};

const updateProducto = (producto,idGer,idProd,callback)=>{
    const {Nombre,Cantidad,Gramaje,Costo,Precio_venta,Descripcion,Fecha_caducidad} = producto;
    connection.query('UPDATE Producto SET Nombre=?,Cantidad=?,Gramaje=?,Costo=?,Precio_venta=?,Descripcion=?,Fecha_caducidad=?,id_administrador=? WHERE id_producto=?',[Nombre,Cantidad,Gramaje,Costo,Precio_venta,Descripcion,Fecha_caducidad,idGer,idProd],(error, results, fields)=>{
        if (error) throw error;
        callback(`Updated ${results.affectedRows} rows`);
    });
};

const updateProductoCantidad = (Cantidad,idProd,callback)=>{
    connection.query('UPDATE Producto SET Cantidad=? WHERE id_producto=?',[Cantidad,idProd],(error, results, fields)=>{
        if (error) throw error;
        callback(`Updated ${results.affectedRows} rows`);
    });
};

const deleteProducto = (idProd,callback)=>{
    connection.query('DELETE FROM Producto WHERE id_producto=?',idProd,(error, results, fields)=>{
        if (error) throw error;
        callback(`Deleted ${results.affectedRows} rows`);
    })
};

module.exports = {
    getProductos,
    getProductobyId,
    insertProducto,
    updateProducto,
    deleteProducto,
    updateProductoCantidad
}