'use strict'

var router = require('express').Router();

var api_key = process.env.MAILGUN_API_KEY;
var domain = process.env.MAILGUN_DOMAIN;
console.log("api key and dom key :", api_key, domain)
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

var sender = 'Welcome <welcome@tradingPost.com>';

module.exports = {
  sendWelcome: function(user,cb){
    var data = {
      from: sender,
      to: user.email,
      subject: 'Welcome to Trading Post',
      text: `Hi ${user.username}!\n\nWelcome to the Trading Post.\n\nNow get to tradin'!`
    }
    console.log('sending mail:', data)
    mailgun.messages().send(data,cb);
  },
  sendOfferAlert: function(){

  }
};





