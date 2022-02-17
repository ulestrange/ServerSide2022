const express = require('express')
const app = express()
const port = 3000

const cookieParser = require('cookie-parser');
const home = require('./routes/home')
const staff = require('./routes/staff');
const { newsMiddleware } = require('./lib/middleware');


app.use(express.static('public'));

// set up handlebars view engine
var handlebars = require('express-handlebars')
.create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');


app.use(cookieParser("una is great"));

app.use(newsMiddleware)

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
