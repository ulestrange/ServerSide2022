const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
    name: String,
    dob: Date,
    imageurl: String,
    hobbies: [String]
})

const Staff = mongoose.model('Staff', staffSchema)

// var data = {
//     "foil": {
//         "name": "foil",
//         "dob": "01/01/1998",
//         "imageurl": "/images/foilimage1.png",
//         "hobbies": ["Jokes", "Gags", "Stand up"]
//     },

//     "arms": {
//         "name": "arms",
//         "dob": "03/05/1995",
//         "imageurl": "/images/armsimage1.png"
//     },

//     "hog": {
//         "name": "hog",
//         "imageurl": "/images/hogimage1.png"
//     }
// }

exports.Staff = Staff;