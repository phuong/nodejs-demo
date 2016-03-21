'use strict';

var Promise = require('promise');
var MongoClient = require('mongodb').MongoClient;
var config = require('../config.json').database;
var assert = require('assert');

// Connection instance
var connection = null;


function getUrl() {
  var url = 'mongodb://' + config.host + ':' + config.port + '/' + config.name;
  return url;
}

exports = module.exports;

// Connect to database
// Return {Promise} instance
exports.connect = function() {
  var promise = new Promise(function(resolve, reject) {
    var url = getUrl();
    MongoClient.connect(url, function(err, db) {
      assert.equal(null, err);
      connection = db;
      console.log('Connect with databse');
      return resolve(db);
    });
  }).catch(function(err) {
    exports.close();
    callback(err, null);
  });
  return promise;
};

// Call in finally.
// Check and close database
// Return void
exports.close = function() {
  if (connection) {
    connection.close();
    connection = null;
    console.log('Close connection');    
  }
};


