const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

function decodeToken(token){
    return jwt.verify(token, SECRET_KEY) 
}

module.exports={decodeToken}