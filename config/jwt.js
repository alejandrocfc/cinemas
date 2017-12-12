//const EXPIRES_IN_MINUTES = 60 * 24; //24min
const EXPIRES_IN_MINUTES = 60 * 60; //1h
//const EXPIRES_IN_MINUTES = 60 * 60 * 24; //1day
const SECRET = "fb43c07affce7567bc6b3435b0a40989be3b34ee4ec609949a395ada8825db4a";
const ALGORITHM = "HS256";
const ISSUER = "alejandrocfc";
const AUDIENCE = "alejandrocfc";
module.exports.jwtSettings = {
    expiresIn: EXPIRES_IN_MINUTES,
    secret: SECRET,
    algorithm : ALGORITHM,
    issuer : ISSUER,
    audience : AUDIENCE
};