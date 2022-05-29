const connection = require('../db/db');

const getGerentes = (callback)=>{
    connection.query('SELECT * FROM Administrador', (error, results, fields)=>{
        if (error) throw error;
        callback(results);
    });
};

const getGerentebyId = (idGerente,callback)=>{
    connection.query('SELECT * FROM Administrador where id_administrador=?',idGerente,(error, results, fields)=>{
        if (error) throw error;
        if(results.length>0)
            callback(results[0]);
        else    
            callback(-1);
    });
};

module.exports = {
    getGerentes,
    getGerentebyId
}