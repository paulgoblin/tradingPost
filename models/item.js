'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var deepPopulate = require('mongoose-deep-populate')(mongoose);

let Item;

let itemSchema = mongoose.Schema({
  name: {type: String, required: true},
  description: {type: String, required: true},
  imgUrl: {type: String, default: 'https://www.gravatar.com/avatar/2152f0665d54a5cfe8bde11b18f91547?s=328&d=identicon&r=PG'},
  forTrade: {type: Boolean, default: false},
  owner: { type: mongoose.Schema.Types.ObjectId , ref: 'User' },
  offers: [{ type: mongoose.Schema.Types.ObjectId , ref: 'Item' }]
});

itemSchema.plugin(deepPopulate);

itemSchema.statics.addOffer = function (myItemId, tradeItemId, cb){
  Item.findOne({'_id': tradeItemId}, function(err,tradeItem){
    if (err || !tradeItem) cb(err,'trade item not found');
    Item.find({}, function(err,allItems){
      if (err) return cb(err,'error finding all items');

      for (var item in allItems){
        if (tradeItem.offers.indexOf(myItemId) != -1) {
          return cb(null,'Item already offered')
        }
      }

      tradeItem.offers.push(myItemId);
      tradeItem.save(function(err){
        console.log('saved correctly')
        if (err) return cb(err,'Error saving offer');
        cb(null,'1');
      })
    })  
  })
}

itemSchema.statics.rejectOffer = function (itemId, offerId, cb){
  Item.findOne({'_id': itemId}, function(err, item){
    if (err) return cb(err,'couldnt find traded item');
    let offerIndex = item.offers.indexOf(offerId);
    item.offers.splice(offerIndex-1,1);
    item.save(function(err){
      if (err) return cb(err,'error saving item');
      cb(null,'1')
    })
  })
}



Item = mongoose.model('Item', itemSchema);

module.exports = Item;










