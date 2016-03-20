var Transaction = require('../database').Transaction;
var Like = function () {

};

Like.prototype.insert = function (data, callback) {
  Transaction.autoCommit(function (db) {

    db.like.insert({
      // Database for like collection here
    });
    db.products.find(data.productId).increase();

  }, function (err, obj) {
    callback(err, obj);
  });
}

module.exports = Like;