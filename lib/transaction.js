'use strict';

var DB = require('./db');

var field = 'transaction';

var db;

var collections = [];

function getBackupCollectionName(collectionName) {
  return '__' + collectionName;
}

function Transaction() {
  this.db = null;
  this.currentCollections = null;
}


// Lock database, not allow write from other DAO
Transaction.prototype.lock = function () {
  if (db) {
    var lockDatabase = function () {
      console.log('Lock database');
      return db.collection('configs').updateOne(
              {'name': field},
      {'collections': collections, 'lockAt': new Date(), 'name': field},
      {'upsert': true}
      );
    }

    var cloneCollections = function () {
      console.log('Clone database');
      var collection;
      var backup;
      var promise = Promise.resolve(true);
      for (var i = 0; i < collections.length; i++) {
        collection = collections[i];
        backup = getBackupCollectionName(collection);
        return promise.then(function () {
          return db.collection(collection).find().forEach(function (c) {
            db.collection(backup).insert(c);
          })
        });
      }
      return promise;
    }

    return Promise.resolve(true)
            .then(lockDatabase)
            .then(cloneCollections)
            .catch(function (err) {
              throw err;
            });
  }
  return db;
}



function unlockDatabase() {
  console.log('Unlock database');
  return db.collection('configs').updateOne(
          {'name': field},
  {'collections': null, 'lockAt': null},
  {'upsert': true}
  );
}

function deleteCollections() {
  var promise = Promise.resolve(true);
  var collection;
  for (var i = 0; i < collections.length; i++) {
    collection = collections[i];
    return promise.then(function () {
      return db.collection(collection).drop();
    });
  }
  return promise;
}

// Incase revert failed, DB.collection will return backup version
function revertCollections() {
  var promise = Promise.resolve(true);
  var collection;
  var backup = getBackupCollectionName(collection)
  for (var i = 0; i < collections.length; i++) {
    collection = collections[i];
    return promise.then(function () {
      return db.collection(backup).find().forEach(function (c) {
        db.collection(collection).insert(c);
      });
    });
  }
  return promise;
}

Transaction.prototype.rollback = function () {
  console.log('Rollback database');
  if (db) {
    return Promise.resolve(true)
            .then(deleteCollections)
            .then(revertCollections)
            .then(unlockDatabase)
            .catch(function (err) {
              throw err;
            });
  }
  return false;
}



function removeTempCollections() {
  var collection;
  var promise = Promise.resolve(true);
  for (var i = 0; i < collections.length; i++) {
    collection = collections[i];
    return promise.then(function () {
      return db.collection(getBackupCollectionName(collection)).drop();
    });
  }
  return promise;
}

// Unlock database
// Remove template database
Transaction.prototype.commit = function () {
  console.log('Commit database');
  return Promise.resolve(true)
          .then(unlockDatabase)
          .then(removeTempCollections)
          .catch(function (err) {
            throw err;
          });
}

// Start a transaction proccess
Transaction.prototype.start = function (collections_, proccess, callback) {
  var self = this;
  var promise = DB.connect(callback);
  promise
          .then(function (db_) {
            db = db_;
            collections = collections_;
            return self.lock();
          })

          // Update database
          .then(function () {
            return proccess(DB, promise);
          })

          // After procecss, commit database 
          // Or rollback in case exception
          .then(function () {
            return self.commit();

          }, function () {
            return self.rollback();
          })

          // Close connection and reset vars
          .finally(function () {
            DB.close();
            self.close();
            return callback();
          });
}

Transaction.prototype.close = function () {
  db = null;
  collections = [];
}

module.exports = new Transaction();