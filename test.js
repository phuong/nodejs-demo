var Promise = require('promise');
var DB = require('./lib/db');
var Like = require('./lib/like');
var Product = require('./lib/product');


data1 = {
  productId: 1,
  userId: 1,
}

data2 = {
  productId: 1,
  userId: 1,
  makeException: true
}

Like.save(data1, function () {
  DB.close();
})

