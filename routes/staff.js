const express = require('express');
const { readStaff , createStaff } = require('../models/staff');
const router = express.Router();



router.post('/addnew', async (req, res) => {

    console.log("Data received from a  post");
    console.table(req.body);

    createStaff(req.body);

    res.redirect(303, '/staff')



})

router.get('/addnew', async (req, res) => {

    res.render('staffform')



})


router.get('/:name', async (req, res) => {
    var name = req.params.name;
    console.log(name);

  //  const person = await Staff.findOne({'name': name}).lean();

    const person = await readStaff({'name': name})

    console.table(person);

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
   // const staff = await Staff.find().lean();

    const staff = await readStaff();

    console.table(staff)

    res.render('listing', { personlist: staff })
    
})



module.exports = router;