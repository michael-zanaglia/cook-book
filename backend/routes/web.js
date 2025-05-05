const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();
const multerConfig = require("../config/configStorage");
const upload = multerConfig().single("media");


const UserController = require('../controller/UserController');
const TagController = require('../controller/TagController');
const ArticleController = require('../controller/ArticleController');
const DashboardController = require('../controller/DashboardController');
const CommentController = require('../controller/CommentController');

router.get('/profile', auth, (req, res)=> { 
    res.status(200).json({
        user: req.user
    })
})

//------------- Login/Register -----------
router.post('/register', UserController.create)
router.post('/login', UserController.login)
router.post('/logout', UserController.logout)

//------------- ArticleView -----------
router.patch('/article/rate', auth, ArticleController.rate)
router.get('/article/meta/:id', ArticleController.show)
router.post('/comment/store', auth, CommentController.store)
router.get('/article/:id/comments', CommentController.show)
router.patch('/comment/update', CommentController.update)


//------------- ReceipeEdit -----------
router.get('/tags/common', TagController.getCommon)
router.post('/article', auth, upload, ArticleController.store)
router.get('/article/:id', ArticleController.edit)
router.delete('/article/edit/:id', ArticleController.remove)
router.patch('/article/edit/update', auth, upload, ArticleController.update)


//------------- Dashboard -----------
router.get('/dashboard/:id', auth, DashboardController.index)


//------------- Home -----------
router.get('/article', ArticleController.index)

router.get('/auth', auth, (req, res) => {
    return res.status(200).json({ user: req.user })
})

module.exports = router;