'use strict';

var User = require('../models/User');

module.exports = function(req, res, next){
  var userId = req.cookies.userId;
  console.log('authorization: ',userId);
  User.findById(userId, function(err, user){
    if(err || !user) return res.status(401).send(err || 'Authentication required.');
    next();
  });
};