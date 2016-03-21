'use strict';

var Promise = require('promise');
var MongoClient = require('mongodb').MongoClient;
var config = require('../config.json').database;
var assert = require('assert');

// Connection instance
var db = null;
var promise = null;

function getUrl() {
  var url = 'mongodb://' + config.host + ':' + config.port + '/' + config.name;
  return url;
}

exports = module.exports;



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
      console.log('db:catch');
      console.error(err);
      console.error(err.stack);
      exports.close();
    });
  }
  return promise;
}

// Call in finally.
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
  // TODO: Check collection and backup collection
  // Revert backup collection and clear
  return db.collection(name);
}