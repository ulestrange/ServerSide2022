const express = require('express');
const { readStaff , createStaff } = require('../models/staff');
const router = express.Router();



router.post('/addnew', async (req, res) => {



    createStaff(req.body);

    res.redirect(303, '/staff')



})

router.get('/addnew', async (req, res) => {

    res.render('staffform')


})


router.get('/:name', async (req, res) => {
    var name = req.params.name;

    const person = await readStaff({'name': name})

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
    const staff = await readStaff();

    res.render('listing', { personlist: staff })
    
})



module.exports = router;