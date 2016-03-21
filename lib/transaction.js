'use strict';

var DB = require('./db');

function Transaction() {
  this.db = null;
}

Transaction.prototype.getDB = function() {
  // Return main db
}

Transaction.prototype.getCopyDB = function() {
  // Return a clone of db
}

Transaction.prototype.start = function() {
  // Lock the database, not allow write
  console.log('transaction start');
}

Transaction.prototype.commit = function() {
  // Sync to db2, db2 is a clone of main database
}

Transaction.prototype.rollback = function() {
  // Sync db2 to db1
}

Transaction.prototype.autoCommit = function(process, callback) {
  var self = this;
  // Check both process and callback is function
  var db = Transaction.start();
  var result = process(db);

  // If process worked fine, return result we commit this transaction
  // Else return error, we rollback this transaction
  if (result) {
    self.commit(callback);
  } else {
    self.rollback(callback);
  }
}

Transaction.prototype.lock = function(collections) {
  if (this.db) {
    return this.db;
  }
  return this.db;
}


Transaction.prototype.unLock = function() {
  if (this.db) {
    //return this.db.querySomething;
    return this.db;
  }
}

Transaction.prototype.start = function(collections, proccess, callback) {
  var self = this;
  var promise = DB.connect();
  promise.then(function(db) {
    self.db = db;
    return self.lock(collections);
    
  }).then(function() {
    // Do something here
    return;
    
  }).then(function() {
    // Do something work fine, nothing has rejected
    self.commit(callback);
    
  }, function() {
    // Rollback this transacation
    self.rollback(callback);
    
  }).finally(function () {
    DB.close();
    self.db = null;
  });
}

module.exports = new Transaction();