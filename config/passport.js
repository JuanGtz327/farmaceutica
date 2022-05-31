const passport = require('passport');
const { getGerentebyUsername } = require('../controllers/gerenteController');
const { getTrabajadorbyNSS } = require('../controllers/trabajadorController');
const LocalStrategy = require('passport-local').Strategy;

passport.use('ger-sign', new LocalStrategy({
    usernameField: "Usuario",
    passwordField: 'Password'
}, async (usuario, password, done) => {
    getGerentebyUsername(usuario, gerente => {
        if (gerente == -1) {
            console.log('NO GERENTE');
            return done(null, false, { message: "No se encontro un doctor" });
        } else {
            if (gerente.contrasena === password) {
                return done(null, gerente);
            } else {
                console.log('BAD PASSWORD');
                return done(null, false, { message: "Contraseña Incorrecta" });
            }
        }
    })
})
);

passport.use('tra-sign', new LocalStrategy({
    usernameField: "NSS",
    passwordField: 'Password'
}, async (nss, password, done) => {
    getTrabajadorbyNSS(nss, trabajador => {
        if (trabajador == -1) {
            console.log('NO TRABAJADOR');
            return done(null, false, { message: "No se encontro un paciente" });
        } else {
            if (trabajador.Contrasena == password) {
                return done(null, trabajador);
            } else {
                console.log('BAD PASSWORD');
                return done(null, false, { message: "Contraseña Incorrecta" });
            }
        }
    })
})
);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    const {NSS,usuario} = user;
    if (NSS) {
        getTrabajadorbyNSS(NSS, trabajador => {
            if (trabajador == -1) {
                console.log('NO TRABAJADOR DES');
                return done(null, false, { message: "No se encontro un trabajador" });
            } else {
                let err = '';
                done(err, trabajador);
            }
        })
    } else {
        getGerentebyUsername(usuario, gerente => {
            if (gerente == -1) {
                console.log('NO GERENTE DES');
                return done(null, false, { message: "No se encontro un gerente" });
            } else {
                let err = '';
                done(err, gerente);
            }
        })
    }
});