const express = require('express')
const app = express()
const port = 3000

app.use(express.static('public'));

// set up handlebars view engine
var handlebars = require('express-handlebars')
.create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');



app.get('/', function (req, res) {
    res.render('home');
});

// 
// app.get('/',  (req, res) => {
//     res.type('text/plain');
//     res.send('Covid Holiday Tours');
// });

app.get('/about',  (req, res) => {
    res.type('text/plain');
    res.send('About Our Holidays');
});

app.get('/contact',  (req, res) => {
    res.type('text/plain');
    res.send('Don\'t bother we never reply');
});

// custom 404 page
app.use( (req, res) => {
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not Found');
});

// custom 500 page
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.type('text/plain');
    res.status(500);
    res.send('500 - Server Error');
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
