const express = require('express');
const pug = require('pug');
const expressSession = require('express-session');
const { response } = require('express');
const routes = require('./routes/routes');
//const bcrypt = require('bcryptjs');

const path = require('path');


const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(expressSession({
    secret: 'wh4t3v3r',
    saveUninitialized: true,
    resave: true
}));

const urlencodedParser = express.urlencoded({extended: false});

const checkAuth = (req,res,next) =>{
    if(req.session.user && req.session.user.isAuthenticated){
        next();
    }else{
        res.redirect('/');
    }
}

app.get('/', (req, res) =>{
    res.render('login');
});

//app.get('/', routes.index);
app.post('/', urlencodedParser, (req,res) =>{
    console.log(req.body.username);
    if(req.body.username == 'user' && req.body.password == 'pass'){
        req.session.user={
            isAuthenticated: true,
            username: req.body.username
        }
        res.redirect('/index');
    }else{
        res.redirect('/register');
    }
});

app.get('/index', checkAuth, (req,res) =>{
    res.send(`Authorized Access: Welcome! ${req.session.user.username}`);
})

app.get('/register',(req,res)=>{
    res.render('register');
})

app.get('/logout', (req,res) =>{
    req.session.destroy(err => {
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.redirect('/');
        }
    });
});

app.listen(3000);