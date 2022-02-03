const express = require('express')
const app = express()
const port = 3000


const home = require('./routes/home')

app.use(express.static('public'));

// set up handlebars view engine
var handlebars = require('express-handlebars')
.create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');


var data = {"foil" : { "name": "foil",
         "dob": "01/01/1998",
        "imageurl": "/images/foilimage1.png",
        "hobbies": ["Jokes", "Gags", "Stand up"]},

"arms" :  { "name": "arms",
        "dob": "03/05/1995",
       "imageurl": "/images/armsimage1.png"},

"hog" : { "name": "hog",
        "imageurl": "/images/hogimage1.png"} }


app.use('/', home)

app.get('/listing', (req,res) =>
    res.render('listing', { personlist: data }))


app.get('/foil',(req, res) => {
    res.render('person', {person : data.foil })
} )

app.get('/arms',(req, res) => {
    res.render('person', {person : data.arms })
} )

app.get('/hog',(req, res) => {
    res.render('person', {person : data.hog})
} )

// 
// app.get('/',  (req, res) => {
//     res.type('text/plain');
//     res.send('Covid Holiday Tours');
// });


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
