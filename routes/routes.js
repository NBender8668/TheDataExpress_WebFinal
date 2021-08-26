const mongoose = require('mongoose');
const fs = require('fs');
const config = require('../config');
const bcrypt = require('bcryptjs');
const exp = require('constants');

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

let salt = bcrypt.genSaltSync(10);


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

exports.loginpage = (req, res) =>
{
    res.render('login', {
        config,
        title: 'Login'
    });
};

exports.homepage = (req, res) =>
{
    let today = new Date();
    let theTime = `${today.getHours()}: ${today.getMinutes()}: ${today.getSeconds()}`;
    User.find((err, user) => {
        res.cookie('time', theTime, {maxAge:999999999999999999});
        res.render('homepage', {
            config,
            title: 'Home',
            time: theTime,
            users : user
        });
    });
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
    user.password = bcrypt.hashSync(user.password, salt);
    user.save((err, user) => 
    {
        if(err) return console.error(err);
        console.log(req.body.username + ' added');
    });
    res.redirect('/homepage');
};

exports.login = (req,res) => {
    User.find({username: req.body.username}, (err,user) => {
        if(err) return console.error(err);
        console.log(user);
        if(user.length > 0)
        {
            if(bcrypt.compareSync(req.body.password, user[0].password))
            {
                req.session.user = {
                    isAuthenticated: true,
                    username: user[0].username,
                    email: user[0].email,
                    age: user[0].age,
                    question1: user[0].question1,
                    question2: user[0].question2,
                    question3: user[0].question3,
                    id: user[0]._id
                }
                res.redirect('/homepage');
            }
            else{
                res.render('login',
                {
                    config,
                    fail: 'user or password does not exsit'
                })
            }
        }
        else{
            res.render('login',
            {
                config,
                fail: 'user does not exsit'
            })
        }
    })
    //bcrypt.compareSync(req.body.password, database password)
}

exports.edit = (req, res) =>
{
    res.render('edit',
    {
        title: 'Edit Profile',
        config,
        user: req.session.user
    });
};

exports.editUser = (req, res) =>
{
    User.findById(req.session.user.id, (err, users) =>
    {
        if(err) return console.error(err);
        users.username = req.body.username;
        users.email = req.body.email;
        users.age = req.body.age;
        users.question1 = req.body.question1;
        users.question2 = req.body.question2;
        users.question3 = req.body.question3;
        users.save((err, users) =>
        {
            if(err) return console.error(err);
            console.log(req.body.username + 'updated');
        });
        res.redirect('/homepage');
    });
};

exports.logout = (req, res) =>
{
    req.session.destroy(err => {
        if(err) {
            console.log(err)
        }
        else {
            res.redirect('/')
        }
    })
}

exports.api = (req, res) =>
{
    console.log(req.query.id);
    if(req.query.id == undefined)
    {
        res.json(User);

    }
    else
    {
        res.json(User[req.query.question1]);
    }
}




