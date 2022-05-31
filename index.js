const express = require('express');
const hbs = require('express-handlebars');
const session = require('express-session');
const passport = require('passport');
const dotenv = require('dotenv').config();
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;

require('./config/passport')

app.set('views',path.join(__dirname,'views'));
app.engine('hbs',hbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'),'layouts'),
    partialsDir: path.join(app.get('views'),'partials'),
    extname: '.hbs',
}));
app.set('view engine','hbs');

app.use(express.urlencoded({extended:false}));

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))

app.use(passport.initialize());
app.use(passport.session());

app.use((req,res,next) =>{
    res.locals.user=req.user || null;
    next();
});

app.use('/',require('./routes/router'));
app.use('/gerente',require('./routes/gerenteRouter'));
app.use('/trabajador',require('./routes/trabajadorRouter'));

app.use('/static',express.static(path.join(__dirname,'public')));

app.listen(PORT,()=>{
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});