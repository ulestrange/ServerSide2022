const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session);
const cookieParser = require('cookie-parser');

const PORT =  process.env.PORT || 3000
const DATABASEURI = process.env.DATABASEURI || 'mongodb://127.0.0.1:27017/SS2022'
const SECRET = process.env.SECRET || 'una is great'


const app = express()
const store = new MongoDBStore({uri:DATABASEURI,
collection: 'mySessions'})


// Catch errors
store.on('error', function(error) {
  console.log(error);
});


// our own middleware

const {flashMiddleware} = require('./lib/middleware.js');
const { newsMiddleware } = require('./lib/middleware');

// our routes


const home = require('./routes/home')
const staff = require('./routes/staff');


// middleware which allows the server to deliver static assets and sets the 
// name of the directory for those assets.

app.use(express.static('public'));

// set up handlebars view engine
var handlebars = require('express-handlebars')
.create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// middleware for parsing the body of a form need this before you can use req.body

app.use(express.urlencoded({ extended: true }))

app.use(session(
  {secret: SECRET,
cookie: {maxage: 6000},
resave: false,
saveUninitialized: false,
store: store
}
))


// import our own Middleware

app.use(cookieParser(SECRET));

app.use(flashMiddleware);
app.use(newsMiddleware)


const connectionString = DATABASEURI;


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


app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
