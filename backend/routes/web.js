const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

const UserController = require('../controller/UserController')

router.get('/profile', auth, (req, res)=> { 
    res.status(200).json({
        user: req.user
    })
})

//------------- Login/Register -----------
//router.post('/login')
router.post('/register', UserController.create)
router.post('/login', UserController.login)
router.post('/logout', UserController.logout)

router.get('/auth', auth, (req, res) => {
    res.status(200).json({ user: req.user })
})

module.exports = router;