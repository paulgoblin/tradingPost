'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

let Item;

let itemSchema = mongoose.Schema({
  name: {type: String, required: true},
  description: {type: String, required: true},
  imgUrl: {type: String, default: 'https://www.gravatar.com/avatar/2152f0665d54a5cfe8bde11b18f91547?s=328&d=identicon&r=PG'},
  forTrade: {type: Boolean, default: false},
  owner: { type: mongoose.Schema.Types.ObjectId , ref: 'User' },
  offers: [{ type: mongoose.Schema.Types.ObjectId , ref: 'Item' }]
});


Item = mongoose.model('Item', itemSchema);

module.exports = Item;

