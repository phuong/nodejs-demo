var Promise = require('promise');
var DB = require('./lib/db');
var Like = require('./lib/like');
var Product = require('./lib/product');


data1 = {
  productId: 1,
  userId: 1,
  name: 'Product 1'
}

data2 = {
  productId: 1,
  userId: 1,
  name: 'Product 1',
  makeException: true
}

Product.has(data1.productId).then(function (doc) {
  if(!doc) {
    return Product.save(data1);
  }
  return true;
}).then(function () {
  
  Like.save(data1);
  Like.save(data2);
  
});