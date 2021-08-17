const express = require('express');
const pug = require('pug');
const routes = require('./routes/routes');
const path = require('path');
const { access } = require('fs');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(expressSession ({
    secret:'wh4t3v3r',
    saveUnintialized: true,
    resave: true
}));

let urlencodedparser = express.urlencoded({

        extended: false
});

const checkAuth = (req,res,next) =>{
    if(req.session.user && req.session.user.isAuthenticated){
        next();
    }else{
        res.redirect('/');
    }
}

app.get('/', (req,res) =>{
    res.urlencodedparser('login');
});
app.get('/', routes.index);
app.post('/',urlencodedParser,(req,res) =>{
    console.log(req.body.username);
    if(req.body.username == 'user' && req.body.password == 'pass'){
        req.session.user={
            isAuthenticated: true,
            username: req.body.username
        }
        res.redirect('/private');
    }else{
        res.redirect('/');
    }
});
app.get('/private', checkAuth, (req,res) =>{
   //res.send(Authorized access: `Welcome${req.session.user.username}!`);
});
app.get('/public',(req,res)=>{
    res.send('This is a public page');
})



app.listen(3000);