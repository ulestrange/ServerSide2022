const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const app = express()
const port = 3000


const home = require('./routes/home')
const staff = require('./routes/staff')

app.use(express.static('public'));

// set up handlebars view engine
var handlebars = require('express-handlebars')
.create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// middleware for parsing the body of a form need this before you can use req.body

app.use(express.urlencoded({ extended: true }))

app.use(session(
  {secret: "una is great!!",
cookie: {maxage: 6000},
resave: false,
saveUninitialized: false,
}
))

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





app.use('/', home)

app.use('/staff', staff)




// custom 404 page
app.use( (req, res) => {
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
