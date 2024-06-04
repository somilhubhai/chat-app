const JWT  = require("jsonwebtoken");

const secret = "@hellobrother";

function createTokenForUser(user) {
    const payload = {
        _id : user._id,
        email : user.email,
        fullName : user.fullName,
    }
    const token = JWT.sign(payload , secret);
    return token;
}

function verifyUser(token) {
    const payload = JWT.verify(token , secret);
    return payload;
}

module.exports = {
    createTokenForUser,
    verifyUser,
}