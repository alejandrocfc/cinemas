const mongoose = require('mongoose');
const bcrypt   = require('bcrypt-nodejs');

// create a schema
const userSchema =  mongoose.Schema({
    email:String,
    password:String
});
// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};
const collectionName = 'user';
const User = mongoose.model('user', userSchema, collectionName);

// make this available to our users in our Node applications
module.exports = User;


