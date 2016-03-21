'use strict';

var Transaction = require('./transaction');

exports = module.exports;


exports.insert = function(data, callback) {
  Transaction.start(['product', 'like'], function(db, promise) {
    return promise.then(function () {
      console.log('insert to like collection');
      return db;
    }).then(function () {
      //return insert to database;
      console.log('update product collection');
      return true;
    });
  });
}

