const express = require('express');
const pug = require('pug');
const cookieParser  = require('cookie-parser');
const routes = require('./routes/routes');
const path = require('path');

const app = express();

app.use(cookieParser());

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

let urlencodedparser = express.urlencoded(
    {
        extended: false
    }
    );

    let myString = 'Bob'
let visited = 0;

app.get('/', (req, res) => {
    res.cookie('visited', visited, {maxAge: 99999999999});
    res.cookie('stuff', myString, {maxAge: 99999999999});
    
    if(req.cookies.beenToSiteBefore == 'yes')
    {
        res.send(`you have been here ${req.cookies.visited} times before`);
        visited++;
    }
    else
    {
        res.cookie('beenToSiteBefore', 'yes', {maxAge:99999999999999});
        res.send('This is your first time here!');
    }
});



app.listen(3000);