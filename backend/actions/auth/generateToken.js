const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.SECRET_KEY;

function generateJWTToken(user, remember){
    const payload = {
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        profile_image_path: user.profile_image_path,
        role: user.role,
        birthdate: user.birthdate
    }
    authToken = jwt.sign(payload, SECRET_KEY, { expiresIn: remember ? 60*60*24 : 60*15 })
    return authToken;
    //* 60 * 24 * 30
}

module.exports = {
    generateJWTToken
}