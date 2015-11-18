'use strict'

var router = require('express').Router();
var User = require('../models/User');
var Item = require('../models/item');

var authMiddleWare = require('../config/auth');

router.post('/create', authMiddleWare, function(req,res){
  var item = req.body;
  item.owner = req.cookies.userId;
  console.log('saving item:', item)
  Item.create(item, function(err,item){
    res.status(err ? 400 : 200).send(err || item)
  })
})

module.exports = router;