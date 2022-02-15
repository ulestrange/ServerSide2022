const express = require('express');
const { Staff } = require('../models/staff');
const router = express.Router();







router.get('/:name', async (req, res) => {
    var name = req.params.name;
    console.log(name);

    const person = await Staff.findOne({'name': name}).lean();
    if (!person) {
        console.log('404 because person doesn\'t exist');
        res.render('404');
    }
    else {
        res.render('person', { person: person });
    }
})


router.get('/', async (req, res) =>
{
    const staff = await Staff.find().lean();
    console.table(staff)

    res.render('listing', { personlist: staff })
    
})



module.exports = router;