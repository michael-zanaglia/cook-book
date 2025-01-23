const authActions = require("../actions/auth/decodeToken");


function auth(req, res, next){
    const auth_token = req.cookies.auth_token;
    if(!auth_token){
        return res.status(403).json({message : "Pas connecté", success : false})
    }
    try {
        const decoded = authActions.decodeToken(auth_token);
        req.user = decoded;
        next()
    } catch {
        res.status(403).json({ message : "Authentification invalide!"});
    }
    
}

module.exports = auth;