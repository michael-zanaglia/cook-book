const User = require('../models/User');
const AuthActions = require("../actions/auth/AuthActions")

async function create(req, res){
    try {
        const data = req.body.form
        const user = new User(data);
        //user.confirm_password = data.confirm_password;
        await user.save()
        return res.status(201).json({message: 'Inscription réussie'})
    } catch (err) {
        return res.status(401).json({message: err.message})
    }  
}

async function login(req, res){
    try {
        const { email, password, remember } = req.body.form;
        const authToken = await AuthActions.execute(email, password, remember);
        if(!authToken) throw new Error("Tentative de connection échouée. Veuillez rééssayer")

        return res // Enregistre dans les cookies en httponly le token.
                .status(200)
                .cookie("auth_token", authToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                })
                .json({ message: "Connexion réussie !!"})

    } catch (err) {
        return res.status(401).json({message: err.message})
    }   
}

function logout(req, res){
    const authToken = req.cookies.auth_token;
    // console.log(req.cookies)
    if(authToken){
       return res
        .status(200)
        .clearCookie("auth_token")
        .json({message: "Deconnexion réussie !"});
    } 
    return res.status(403).json({message:"error logout"});
}

module.exports =  {
    create,
    login,
    logout
};