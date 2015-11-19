'use strict';

var User = require('../models/user');

module.exports = function(req, res, next){
  var userId = req.cookies.userId;
  console.log('authorization: ',userId);
  User.findById(userId, function(err, user){
    req.username = user.username
    if(err || !user) return res.status(401).send(err || 'Authentication required.');
    next();
  });
};