const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const { generateJWTToken } = require('./generateToken');

async function execute(email, password, remember){
    const user = await User.findOne({email: email})
    if(!user) throw new Error("Aucun utilisateur n'a été trouvé.")

    const isPasswordMatching = await bcrypt.compare(password, user.password)
    if(!isPasswordMatching) throw new Error("Mot de passe invalide.")
        
    return generateJWTToken(user, remember);
}

module.exports = { execute }