const mongoose = require('mongoose');

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



// Joke.find(req.query.category ? {Category: req.query.category} : {}, (err, joke) => 
// {
//     if(err) return console.error(err);
//     console.log(joke);
//     res.render('index',
//     {
        
//     });
// }).limit(req.query.amount ? parseInt(req.query.amount) : 1000);