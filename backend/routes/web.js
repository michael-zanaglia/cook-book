const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

const UserController = require('../controller/UserController')

router.get('/profile', auth, (req, res)=> { 
    res.send("profile")
})
router.get('/login', (req, res)=> {
    res.send("login")
})

//------------- Login/Register -----------
//router.post('/login')
router.post('/register', (req, res)=> {
    console.log(req.body)
    UserController.create(req.body)
})

module.exports = router;