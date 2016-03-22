## nodejs-demo

### Transaction solution
In this solution, we just handler transaction at collection tier. We create a clone of collections before write and
revert all related collections when an exception has thrown.


We call `Transaction.start(collections, process, callback)` to run a process which contains
many update database actions. Once method has called, we lock all collections that defined in `collections`, and other 
actions which want to update database have to wait (Need to check write permission before run!).

Before run `process`, we create backups of `collections`, then call `proccess`.
After `process` ran completely, if no exception has thrown, we clean backup collections and unlock database.


### Install and run
install dependencies:
```
    $ cd nodejs-demo && npm install
```

run the app:
```
    $ DEBUG=nodejs-demo:* npm start
```


### How to use?
Take a look at lib/like.js, We define a `process` function, it will receive DB instance and a promise instance.
And `process` contains all update-database actions. In any case of error, we just throw it out and
Transaction will revert to previous version of collections.


```javascript
var Transaction = require('./transaction');

exports = module.exports;

exports.save = function (data, callback) {
  data.productId = parseInt(data.productId);
  function process (DB, promise) {
    return promise.then(function () {
      if (data.hasOwnProperty('makeException')) {
        throw Error('Some exception when insert new like');
      }
      return DB.getCollection('likes').insertOne(/*data*/);
    }).then(function () {
      return DB.getCollection('products').update(/*data*/)
    });
  }
  return Transaction.start(['products', 'likes'], process, callback);
}
```
