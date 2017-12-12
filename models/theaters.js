let mongoose = require('mongoose');

// create a schema
let theaterSchema =  mongoose.Schema({
    createAt: Date,
    updateAt: Date,
    name: String,
    address: String,
    phone: Number
});

let collectionName = 'theater';

// the schema is useless so far
// we need to create a model using it
let Theater = mongoose.model('theater', theaterSchema, collectionName);

// make this available to our users in our Node applications
module.exports = Theater;


