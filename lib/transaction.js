

function Transaction() {

}

Transaction.prototype.getDB = function () {
  // Return main db
}

Transaction.prototype.getCopyDB = function () {
  // Return a clone of db
}

Transaction.prototype.start = function () {
  // Lock the database, not allow write
}

Transaction.prototype.commit = function () {
  // Sync to db2, db2 is a clone of main database
}

Transaction.prototype.rollback = function () {
  // Sync db2 to db1
}

Transaction.prototype.autoCommit = function (process, callback) {
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

module.exports = MongoClient;