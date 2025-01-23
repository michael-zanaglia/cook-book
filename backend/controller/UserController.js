const User = require('../models/User');
const AuthActions = require("../actions/auth/AuthActions")

async function create(req, res){
    try {
        const data = req.body;
        const user = new User(data);
        user.confirm_password = data.confirm_password;
        await user.save()
    } catch (err) {
        console.error(err.message)
    }
    
}
async function login(req, res){
    try {
        const { email, password } = req.body;
        const authToken = await AuthActions.execute(email, password);
        if(!authToken) throw new Error("Tentative de connection échouée. Veuillez rééssayer")

        return res // Enregistre dans les cookies en httponly le token.
                .status(200)
                .cookie("auth_token", authToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                })
                .json({ message: "Connexion réussie !!"})

    } catch (err) {
        res.status(401).json({message: err.message})
    }   
}

function logout(req, res){
    const authToken = req.cookies.auth_token;
    console.log(req.cookies)
    if(authToken){
       res
        .status(200)
        .clearCookie("auth_token")
        .json({message: "Deconnexion réussie !"})
        .end(); 
    } 
    res.status(403).json({message:"error logout"})
}

module.exports =  {
    create,
    login,
    logout
};