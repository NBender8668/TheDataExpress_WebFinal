const mongoose = require('mongoose');
const fs = require('fs');
const config = require('../config');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb+srv://NoahBender:-3C.Uczz7bEii@g@cluster0.5ab23.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', 
{
    useUnifiedTopology: true,
    useNewUrlParser: true
});

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

let mdb = mongoose.connection;
mdb.on('error', console.error.bind(console, 'connection error'));
mdb.once('open', callback => {});

exports.index = (req, res) =>
{
    if(err) return console.error(err);
    res.render('index', {config});
};