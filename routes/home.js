'use strict';

var express = require('express');
var router = express.Router();
var User = require('../models/user');

var authMiddleWare = require('../config/auth');

router.get('/', authMiddleWare, function(req, res) {
  User.findOne({'_id' : req.cookies.userId}, function(err,user){
    console.log("user:", user);
    res.render("home",{user});
  })
});

//POPULATE HOME WITH ITEMS


module.exports = router;
