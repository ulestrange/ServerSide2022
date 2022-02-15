const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
    name: String,
    dob: Date,
    imageurl: String,
    hobbies: [String]
})

const Staff = mongoose.model('Staff', staffSchema)

var data = [
    {
        "name": "foil",
        "dob": "01/01/1998",
        "imageurl": "/images/foilimage1.png",
        "hobbies": ["Jokes", "Gags", "Stand up"]
    },

    {
        "name": "arms",
        "dob": "03/05/1995",
        "imageurl": "/images/armsimage1.png"
    },

    {
        "name": "hog",
        "imageurl": "/images/hogimage1.png"
    }
]

readStaff = async (options={}) => {
   if (Object.entries(options).length == 0)
   {
       return data;
   }
   else if (options.name)
   {
       console.log('this is the option' + options.name);
       return data.find(e => e.name==options.name)
   }
   else{
       return undefined;
   }
}

createStaff = async ( dataFromUser) => {
    console.log(dataFromUser)
    data.push(dataFromUser);
}

exports.readStaff = readStaff;
exports.createStaff = createStaff;