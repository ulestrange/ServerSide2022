const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const app = express()
const port = 3000

const cookieParser = require('cookie-parser');


// our own middleware

const {flashMiddleware} = require('./lib/middleware.js');
const { newsMiddleware } = require('./lib/middleware');

// our routes


const home = require('./routes/home')
const staff = require('./routes/staff');




// set up handlebars view engine
var handlebars = require('express-handlebars')
.create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// middleware which allows the server to deliver static assets and sets the 
// name of the directory for those assets.

app.use(express.static('public'));

// middleware for parsing the body of a form need this before you can use req.body

app.use(express.urlencoded({ extended: true }))

app.use(session(
  {secret: "una is great!!",
cookie: {maxage: 6000},
resave: false,
saveUninitialized: false,
}
))

app.use(cookieParser("una is great"));


// import our own Middleware



app.use(flashMiddleware);
app.use(newsMiddleware)


const connectionString = 'mongodb://127.0.0.1:27017/SS2022'


mongoose.connect(connectionString, {
  "useNewUrlParser": true,
  "useUnifiedTopology": true
}).
catch ( error => {
  console.log('Database connection refused' + error);
  process.exit(2);
})

const db = mongoose.connection;


db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', () => {
  console.log("DB connected")
});

// import our routes


app.use('/', home)
app.use('/staff', staff)




// custom 404 page
app.use( (req, res) => {
  res.status(400);
    res.render('404');
});

// custom 500 page
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.type('text/plain');
    res.status(500);
    res.send('500 - Server Error');
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
