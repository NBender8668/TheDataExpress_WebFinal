const express = require('express');
const pug = require('pug');
const expressSession = require('express-session');
const { response } = require('express');
const routes = require('./routes/routes');
const { decodeBase64 } = require('bcryptjs');


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

app.use((req, res, next) =>
{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin X-Requested-With, Content-Type, Accept');
    next();
});

app.post('/logout', (req,res) => {
    req.session.destroy(err => {
        if(err) {
            console.log(err)
        }
        else {
            res.redirect('/')
        }
    })
})

app.get('/', routes.loginpage);
app.post('/', urlencodedParser, routes.login);
app.get('/api', routes.api);
app.get('/create', routes.create);
app.post('/create',urlencodedParser, routes.createUser );
app.get('/homepage', routes.homepage);
app.post('/homepage', urlencodedParser, routes.homepage);
app.get('/edit',routes.edit);
app.post('/edit',urlencodedParser,routes.editUser);
app.listen(3000);