'use strict';

var Transaction = require('./transaction');

var noop = function () {};

exports = module.exports;

        
exports.save = function (data, callback) {
  data.productId = parseInt(data.productId);
  if (!callback) {
    callback = noop;
  }
  function process (DB, promise) {
    return promise.then(function () {
      console.log('insert to like collection');
      if (data.hasOwnProperty('makeException')) {
        throw Error('Some exception when insert new like');
      }
      return DB.getCollection('likes').insertOne({
        'userId': data.userId,
        'productId': data.productId
      });
    }).then(function () {
      console.log('Update product like');
      return DB.getCollection('products').update(
              {'productId':data.productId},
              { $inc: {'countLike':1}},
              { upsert: true }
       )
    });
  }
  
  return Transaction.start(['products', 'likes'], process, callback);
}

