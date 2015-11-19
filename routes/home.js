'use strict';

var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Item = require('../models/item');

var authMiddleWare = require('../config/auth');

router.get('/', authMiddleWare, function(req, res) {
  User.findOne({'_id' : req.cookies.userId}, function(err,user){

    Item.find({'owner': user._id}).deepPopulate('offers.owner').exec(function(err, items){
      if(err) return res.status(400).send(err);
      var foundItems = items || [];
      console.log("found items: ",items)
      res.render("home",{user: user, items: foundItems});
    })
  })
});


module.exports = router;
