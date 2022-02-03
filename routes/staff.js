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




router.get('/:name', (req, res) => {
    var name = req.params.name;
    res.render('person', { person: data[name] })
})


router.get('/', (req, res) =>
    res.render('listing', { personlist: data }))


module.exports = router;