const express = require('express');
const pug = require('pug');
const expressSession = require('express-session');
const { response } = require('express');
const routes = require('./routes/routes');
const config = require('./config');
//const bcrypt = require('bcryptjs');

const path = require('path');


const app = express();

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.set('views', path.join(__dirname, 'views'));

app.use(expressSession({
    secret: 'wh4t3v3r',
    saveUninitialized: true,
    resave: true
}));

const urlencodedParser = express.urlencoded({extended: false});



app.get('/', routes.login);
app.post('/', urlencodedParser, routes.login);
app.get('/create', routes.create);
app.post('/create',urlencodedParser, routes.createUser );
app.post('/index',routes.homepage);
app.post('/index', urlencodedParser, routes.homepage);

app.listen(3000);