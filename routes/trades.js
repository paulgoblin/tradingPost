'use strict';

var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Item = require('../models/item');

var authMiddleWare = require('../config/auth');

router.get('/', authMiddleWare, function(req, res) {
  let userId = req.cookies.userId;
  Item.find({'forTrade':true}).deepPopulate('offers.owner').populate('owner').exec(function(err, tradeItems){
    if(err) return res.status(400).send(err);
    // console.log("owner of items to traded: ", tradeItems.owner)
    Item.find({'owner':userId}, function(err, myItems){
      if(err) return res.status(400).send(err);
      // var tradeItems = tradeItems || [];
      var myItems = myItems || [];
      // console.log("for trade ",tradeItems,'my items', myItems)
      res.render("trades",{user: userId, username: req.username, tradeItems: tradeItems, myItems: myItems});
    });
  });
});

module.exports = router;

//'forTrade' : true , 'owner': {$ne: req.cookies.userId}
//, '_id':{$ne: userId}      'forTrade':true
