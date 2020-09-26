// Referencing Mongoose
let mongoose = require('mongoose');

let validator = require('validator');

// Defining the schema
let personSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    age: Number,
    favoriteFoods: [{
        type: String
    }]
    }
)

//Exporting a model
module.exports = mongoose.model('Person', personSchema);