function auth(req, res, next){
    console.log(req.query.user)
    if(!req.query.user){
        return res.redirect('/login')
    }
    next()
}

module.exports = auth;