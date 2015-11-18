'use strict';

var express = require('express');
var router = express.Router();
var User = require('../models/User');

var authMiddleWare = require('../config/auth');

router.get('/', authMiddleWare, function(req, res) {
  User.findOne({'_id' : req.cookies.userId}, function(err,user){
    console.log("user:", user);
    res.render("home",{user});
  })
});


module.exports = router;
