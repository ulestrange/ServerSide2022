const express = require('express');
const { readStaff , createStaff, deleteStaff, updateStaff } = require('../models/staff');
const router = express.Router();




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

// no error checking for now.
//
router.get('/:name/delete', async (req, res) => {
    var name = req.params.name;

    await deleteStaff(name);

    res.redirect(303, '/staff');

});



// to edit we first need to fetch the data so we can display in on
// a form to be edited

router.get('/:name/edit', async (req, res) => {

    var name = req.params.name;

    const person = await readStaff({'name': name})

    if (!person) {
        console.log('404 because person doesn\'t exist');
        res.render('404');
    }
    else {
        res.render('staffeditform', { person: person });
    }
})

router.post('/:name/edit', async (req,res) =>{

    await updateStaff(req.body);
    
    res.redirect(303, '/staff')

})

router.post('/addnew', async (req, res) => {

    // note we leave error handling for now and assume our data is created.
    
        await createStaff(req.body);
        req.session.staffdata = {name: req.body.name };

    
        res.redirect(303, '/staff')
       
    
    })
    


router.get('/', async (req, res) =>
{
    const staff = await readStaff();

    if (req.session.staffdata){
        var newName = req.session.staffdata.name;
    }
    else {
        var newName = ""
    }

    res.render('listing', { personlist: staff, newName : newName })
    
})



module.exports = router;