const express = require('express');
const router = express.Router();


var data = {
    "foil": {
        "name": "foil",
        "dob": "01/01/1998",
        "imageurl": "/images/foilimage1.png",
        "hobbies": ["Jokes", "Gags", "Stand up"]
    },

    "arms": {
        "name": "arms",
        "dob": "03/05/1995",
        "imageurl": "/images/armsimage1.png"
    },

    "hog": {
        "name": "hog",
        "imageurl": "/images/hogimage1.png"
    }
}


router.get('/foil', (req, res) => {
    res.render('person', { person: data.foil })
})

router.get('/arms', (req, res) => {
    res.render('person', { person: data.arms })
})

router.get('/hog', (req, res) => {
    res.render('person', { person: data.hog })
})

router.get('/', (req, res) =>
    res.render('listing', { personlist: data }))


module.exports = router;