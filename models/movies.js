let mongoose = require('mongoose');

// create a schema
let movieSchema =  mongoose.Schema({
    createAt: Date,
    updateAt: Date,
    name: String,
    website: String,
    premier: Date,
    language: String,
    theaterID:{type: String, ref: 'theater'},
});

let collectionName = 'movie';

// the schema is useless so far
// we need to create a model using it
let Movie = mongoose.model('movie', movieSchema, collectionName);

// make this available to our users in our Node applications
module.exports = Movie;


