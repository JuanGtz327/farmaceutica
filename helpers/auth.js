const { getGerentebyUsername } = require("../controllers/gerenteController");
const { getTrabajadorbyNSS } = require("../controllers/trabajadorController");
const { getParsedDate } = require("./extras");

const gerAuth = (req, res, next) => {
    if (req.user === undefined) {
        res.render('index', { err: 'Por favor inicie sesion' });
    } else {
        const { usuario } = req.user;
        const { idGer } = req.params;
        if (usuario === undefined) {
            req.logout(err => {
                if (err) {
                    return next(err);
                }
                res.render('index', { err: 'Error en las credenciales de usuario' });
            });
        } else {
            if (req.isAuthenticated()) {
                getGerentebyUsername(usuario, gerente => {
                    if (gerente.id_administrador == idGer) {
                        return next();
                    } else {
                        res.redirect('/logout');
                    }
                })
            } else {
                res.render('index', { err: 'Sesion Inactiva' });
            }
        }
    }
};

const trabAuth = (req, res, next) => {
    if (req.user === undefined) {
        res.render('index', { err: 'Por favor inicie sesion' });
    } else {
        const { NSS } = req.user;
        const { idTrab } = req.params;
        if (req.isAuthenticated()) {
            getTrabajadorbyNSS(NSS, realTrab => {
                getTrabajadorbyNSS(idTrab, currentTrab => {
                    if (realTrab!=undefined && currentTrab!=undefined) {
                        if (getParsedDate(realTrab.Fecha_nacimiento) == getParsedDate(currentTrab.Fecha_nacimiento)) {
                            return next();
                        } else {
                            res.redirect('/logout');
                        }
                    }else{
                        res.redirect('/logout');
                    }
                })
            })
        } else {
            res.render('index', { err: 'Sesion Inactiva' });
        }
    }
};

module.exports = {
    gerAuth,
    trabAuth
}