const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const jwtSettings = require('./jwt');
function verifyToken(token) {
    //var token = req.headers['authorization'];
    var verifyToken;
    // decode token
    if (token) {

        // verifies secret and checks expiration time
        jwt.verify(token, jwtSettings.secret, {algorithm: jwtSettings.algorithm, issuer: jwtSettings.issuer, audience: jwtSettings.audience}, function(err, decoded) {
            if (err) {
                //return res.render('../views/user');
                verifyToken = { success: false, message: err.message, flag: 0};
                //return res.status(403).send(err)
            } else {
                verifyToken= { success: true, message: 'congrats you got in', flag: 1};
            }
        });

    } else {
        // if there is no token return an error
        verifyToken = {
            success: false,
            message: 'No token available.',
            flag: 2
        };

    }
    return verifyToken;
}
function createToken(user){
    console.log(jwtSettings.secret);
    return jwt.sign({
            user: user.toJSON()
        },
        jwtSettings.secret,
        {
            algorithm: jwtSettings.algorithm,
            expiresIn: jwtSettings.expiresIn,
            issuer: jwtSettings.issuer,
            audience: jwtSettings.audience
        }
    );
}

module.exports = {verifyToken:verifyToken,createToken:createToken};