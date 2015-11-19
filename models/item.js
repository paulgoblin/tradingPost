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
        if (err) return cb(err,'Error saving offer');
        cb(null,'Offer successfully added');
      })
    })  
  })
}


    // Item.find({'_id': offeredItemId}, function(err,offeredItem){
    //   if (err) cb(err);
    //   if (this.offers.indexOf(offeredItem._id) == -1){
    //     tradeItem.offers.push(req.params.myItem);
    //     tradeItem.save(function(err){
    //       if (err) return res.status(400).send('error saving');
    //       res.status(200).send('Offer made')
    //     })
    //   }
      
    // })



Item = mongoose.model('Item', itemSchema);

module.exports = Item;

