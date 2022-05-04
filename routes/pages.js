const express = require('express');
const authController = require('../controllers/auth');
const router = express.Router();
const cookieParser = require('cookie-parser');
const auth = require('./auth');

router.post('/sign-up', authController.register);

router.post('/log-in', authController.loginVerify);

router.post('/donate-food',  authController.donateFood);

router.post('/request-food',  authController.requestFood);

router.post('/contact-us',  authController.contactUs);


router.get(['', '/', '/index'], (req, res) => {
    // res.sendFile(__dirname + '/views/index.html');  // to view html file
    // res.send('Hello Worl aa')
    res.render('index', {isAdded: "Express"})
})

router.get('/myprofile', auth, (req, res) => {
    // to verify the login with cookies        
    res.render('myprofile', { isAdded : {isAdded: true, name: req.cookies.jwt.name, id: req.cookies.jwt.id}, } )
})

router.get('/log-out', async(req, res) => {       
    try{
        console.log(req.user);
        res.clearCookie('jwt');
        console.log("logout successfully")
        res.render('log-in', {isAdded: false, success_msg: '', err_msg: ''});
    }catch(error){
        res.status(500).send(error);
    }
})

router.get('/log-in', (req, res) => {    
    res.render('log-in', {isAdded: true, success_msg: '', err_msg: ''})
})

router.get('/sign-up', (req, res) => {    
    res.render('sign-up', {err_email: "", email_not_reg_msg: ""})
})



module.exports = router;