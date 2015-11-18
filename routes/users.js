'use strict'

var router = require('express').Router();
var User = require('../models/user');

var authMiddleWare = require('../config/auth');
var mailer = require('../models/mailer')


router.post('/register', function(req,res){
  console.log('req.cookies',req.cookies)
  User.register(req.body, function(err,savedUser){
    if (err) {
      res.status(400).send(err);
    } else{
      mailer.sendWelcome(savedUser, function(err,body){
        console.log('email body:',err, body);
        res.send()
      });
     }
  });
});

router.post('/login', function(req, res){
  User.authenticate(req.body, function(err, user){
    res.cookie( 'userId', user._id);
    res.status(err ? 400 : 200).send(err || user)
  })
})

router.post('/logout', function(req, res){
  res.clearCookie('userId');
  res.send();
})

router.post('/bio', function(req, res){
  User.findOne({'_id': req.cookies.userId}, function(err,user){
    if (err) return res.send(err);
    console.log('bio post req body: ',req.body.bio),
    user.bio = req.body.bio;
    user.save(function(err){
      res.status(err ? 400 : 200).send(err || 'bio saved!');
    })
  })
})

router.post('/profPic', function(req, res){
  User.findOne({'_id': req.cookies.userId}, function(err,user){
    if (err) return res.send(err);
    console.log('bio post req body: ',req.body.url),
    user.avatar = req.body.url;
    user.save(function(err){
      res.status(err ? 400 : 200).send(err || 'bio saved!');
    })
  })
})

module.exports = router;





