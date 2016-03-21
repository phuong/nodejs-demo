'use strict';

var Transaction = require('./transaction');

exports = module.exports;


exports.insert = function(data, callback) {
  Transaction.start(['product', 'like'], function(promise) {
    promise.then(function() {
      db.insert().then()
    })
  });
}

