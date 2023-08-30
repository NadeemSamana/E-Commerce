const express = require('express');
const route = express.Router();
const tezer = require('../modules/user');
const passport = require('passport');
// const User = require('../modules/user');


// route.get('/fakeuser', async (req,res)=>{
//     const user = {
//         email:'vikas@gmail.com',
//         username:'vikas'
//     }

//     const newuser = await tezer.register(user, '1234');

//     res.send(newuser);
// })

route.get('/login', (req, res)=>{
    res.render('auth/login');
})

route.get('/singup', (req, res)=>{
    res.render('auth/singup');
})

route.post('/singup', async (req,res)=>{
    try {
        const {username, email, role, password} = req.body;
        const user = new tezer({username, email, role});
        // console.log(user);
        const newUser = await tezer.register(user, password);
    
        // res.send(newUser);

        // req.login((err, user)=>{
        //     if(!user){
        //         return next(err);
        //     }
        // })

        req.flash('success', 'congrats');
        res.redirect('/login');
    }
    catch (e) {
        // req.flash('reject', 'batter luck next time');
        req.flash('reject', e.message);
        console.log(e.message);
        res.redirect('/singup');
    }
})

route.post('/login', 
    passport.authenticate(
        'local',
        {
            failureRedirect:'/login',
            failureFlash: true
        }
    ),
    (req,res)=>{

    try {
        req.flash('success', `Wellcom ${req.user.username}`);
        console.log('logged in successfull');
        res.redirect('/products');
    }
    catch (e) {
        req.flash('reject', e.message);
        console.log(e.message);
        res.redirect('/login');
    }
})

route.get('/logout', (req, res, next)=>{
    req.logout(function (err) {
        if(err){return next(err)};
        console.log('logged out');
        res.redirect('/products');
    });

    // req.flash('success', 'good-bye');
    // console.log('logged out');
    // res.redirect('/products');
})



module.exports = route;

