'use strict';

var DB = require('./db');

function Transaction() {
  this.db = null;
}


Transaction.prototype.lock = function(collections) {
  if (this.db) {
    console.log('Lock database');
    var self = this;

    // Lock database, not allow write on some collections
    var lockDatabase = function() {
      var params = {
        query: {_name: "transaction"},
        update: {
          $setOnInsert: {
            lock: collections
          }
        },
        new : true, // return new doc if one is upserted
        upsert: true // insert the document if it does not exist      
      };
      return self.db.collection('config').findAndModify(params);
    };

    // Clone/backup some collections
    var cloneCollections = function() {

    };

    var promise = Promise.resolve(true);
    return promise
            .then(lockDatabase)
            .then(cloneCollections);
  }
  return this.db;
}


Transaction.prototype.rollback = function() {
  if (this.db) {
    //return this.db.querySomething;
    //Delete all 
  }
  return this.db;  
}

// Start a transaction proccess
//
Transaction.prototype.start = function(collections, proccess, callback) {
  console.log(collections);
  var self = this;
  var promise = DB.connect();
  promise
    .then(function(db) {
      self.db = db;
      return self.lock(collections);
    })

    .then(function() {
      return proccess(self.db, promise);
    })
    // After procecss, commit database 
    // Or rollback in case exception
    .then(function() {
      self.commit(callback);

    }, function() {
      self.rollback(callback);

    })

    // Close connection
    .finally(function() {
      DB.close();
      self.db = null;
    });
}

module.exports = new Transaction();