'use strict';

var DB = require('./db');
var Promise = require('promise');

exports = module.exports;


exports.save = function (data) {
  var promise = DB.connect();
  if (data.hasOwnProperty('productId')) {
    data.productId = parseInt(data.productId);
  }
  promise.then(function (db) {
    return db.collection('products').insertOne(data);
  });
  return promise;
}

exports.has = function(id) {
  return DB.connect().then(function(db) {
    return db.collection('products').findOne({'productId': id});
  });
}

exports.getAll = function(callback) {
  DB.connect(callback).then(function(db) {
    var products = [];
    var cursor = db.collection('products').find();
    return cursor.each(function(err, doc) {
      if(doc != null) {
        products.push(doc);
      } else {
        callback(null, products);
      }
    });
  });
}