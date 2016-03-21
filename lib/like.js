'use strict';

var Transaction = require('./transaction');

exports = module.exports;


exports.insert = function (data, callback) {
  Transaction.start(['products', 'likes'], function (DB, promise) {
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
    }).then(function () {
      return true
    }, function (e) {
      console.log(e);
      console.log(e.stack)
    });
  });
}

