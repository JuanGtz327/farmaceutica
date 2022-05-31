const connection = require('../db/db');

const getTrabajadores = (callback)=>{
    connection.query('SELECT * FROM Trabajador', (error, results, fields)=>{
        if (error) throw error;
        callback(results);
    });
}

const getTrabajadorbyNSS = (idTrab,callback)=>{
    connection.query("SELECT * FROM Trabajador WHERE NSS=?",idTrab, (error, results, fields)=>{
        if (error) throw error;
        callback(results[0]);
    });
}

const insertTrabajador = (trabajador,idGer,callback)=>{
    const {Fecha_contrato,Nombres,Apellidos,NSS,Fecha_nacimiento,Salario,Contrasena} = trabajador;
    connection.query('INSERT INTO Trabajador SET Fecha_contrato=?,Nombres=?,Apellidos=?,NSS=?,Fecha_nacimiento=?,Salario=?,Contrasena=?,id_administrador=?',[Fecha_contrato,Nombres,Apellidos,NSS,Fecha_nacimiento,Salario,Contrasena,idGer],(error, results, fields)=>{
        if(error){
            console.log(error);
            callback(-1,error.code);
        }else{
            callback(`Added ${results.affectedRows} rows`);
        }
    });
};

const updateTrabajador = (trabajador,idGer,idTrab,callback)=>{
    const {Fecha_contrato,Nombres,Apellidos,Fecha_nacimiento,Salario,Contrasena} = trabajador;
    connection.query('UPDATE Trabajador SET Fecha_contrato=?,Nombres=?,Apellidos=?,Fecha_nacimiento=?,Salario=?,Contrasena=?,id_administrador=? WHERE NSS=?',[Fecha_contrato,Nombres,Apellidos,Fecha_nacimiento,Salario,Contrasena,idGer,idTrab],(error, results, fields)=>{
        if (error) throw error;
        callback(`Updated ${results.affectedRows} rows`);
    });
};

const deleteTrabajador = (idTrab,callback)=>{
    connection.query('DELETE FROM Trabajador WHERE NSS=?',idTrab,(error, results, fields)=>{
        if (error) throw error;
        callback(`Deleted ${results.affectedRows} rows`);
    })
};

module.exports = {
    getTrabajadores,
    getTrabajadorbyNSS,
    insertTrabajador,
    updateTrabajador,
    deleteTrabajador
}