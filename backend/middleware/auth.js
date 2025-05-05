const authActions = require("../actions/auth/decodeToken");


function auth(req, res, next){
    const auth_token = req.cookies.auth_token;
    //console.log(req)
    if(!auth_token){
        console.log('pas conn')
        return res.status(403).json({message : "disconnected", success : false})
    }
    try {
        const decoded = authActions.decodeToken(auth_token);
        console.log('connected')
        req.user = decoded;
        next()
    } catch {
        console.log('dont exist')
        return res.status(403).json({ message : "Authentification invalide!"});
    }
    
}

module.exports = auth;