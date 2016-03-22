'use strict';

var Promise = require('promise');
var MongoClient = require('mongodb').MongoClient;
var config = require('../config.json').database;
var assert = require('assert');
var onFinished = require('on-finished')

// Connection instance
var db = null;
var promise = null;

function getUrl() {
  var url = 'mongodb://' + config.host + ':' + config.port + '/' + config.name;
  return url;
}

var exports = {};

// Connect to database
// Return {Promise} instance
exports.connect = function (callback) {
  if (null == db) {
    promise = new Promise(function (resolve, reject) {
      var url = getUrl();
      MongoClient.connect(url, function (err, db_) {
        assert.equal(null, err);
        db = db_;
        console.log('Connect with databse');
        return resolve(db);
      });
    }).catch(function (err) {
      exports.close();
      if(callback) {
        callback(err, null);
      }
    });
    return promise;
  } else {
    return Promise.resolve(db);
  }
}

// Call before response
// Check and close database
// Return void
exports.close = function () {
  if (db) {
    db.close();
    db = null;
    console.log('Close db');
  }
}



exports.getCollection = function (name, mode) {
  // TODO: Check collection and backup collection.
  // Revert backup collection and clear.
  // Make sure this collection is writable or
  // delay until this collection has unloked.
  return db.collection(name);
}

// Close database on finish request
// TODO: Check router request and static file request
function mrKeeper(req, res, next) {
  onFinished(res, exports.close);
  next();
}

module.exports = exports;
module.exports.mrKeeper = mrKeeper;