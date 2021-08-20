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

let userSchema = mongoose.Schema(
    {
        username: String,
        email: String,
        age: String,
        question1: String,
        question2: String,
        question3: String,
        password: String
    }
);

let User = mongoose.model('User_Collection', userSchema);

exports.index = (req, res) =>
{
    res.render('login', {config});
};


exports.create = (req, res) =>
{
    res.render('create', 
    {
        config,
        title: "Register"
    });
};

exports.createUser = (req, res) =>
{
    let user = new User(
        {
            username: req.body.username,
            email: req.body.email,
            age: req.body.age,
            question1: req.body.question1,
            question2: req.body.question2,
            question3: req.body.question3,
            password: req.body.password
        }
    );
    user.save((err, user) => 
    {
        if(err) return console.error(err);
        console.log(req.body.username + ' added');
    });
    res.redirect('/index');
};