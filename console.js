var Promise = require('promise');
var DB = require('./lib/db');
var Like = require('./lib/like');

/*
var data1 = {
  productId: 1,
  userId: 1,
}


Like.insert(data1);
*/

data2 = {
  productId: 2,
  userId: 1,
  productName: 'Product 2'
}

/*
DB.connect()
        .then(function (db) {
            return db.collection('products').insertOne({
              productName: data2.productName,
              countLike: 0
            });
        })
*/


Like.insert(data2);


//DB.close();
/*
DB = require('./lib/db');

DB.connect()
        .then(function (db) {
           return db.collection('configs').insertOne({
             'name':'transaction',
             'lockAt': null,
             'collections': []
           });
        })
        .then(DB.close);
*/

/*
promise1 = new Promise(function (resolve, reject) {
  return resolve('1k');
});

promise1.then(function () {
  return promise1.then(function () {
    console.log('#1 Inside a then 1');
  }).then(function () {
    console.log('#1 Inside a then 2');
  })
  
}).then(function () {
  return promise1.then(function () {
    console.log('#2 Inside a then 1');
  }).then(function () {
    console.log('#2 Inside a then 2');
  })
}).then(function () {
  console.log('finally, last then')
})
*/