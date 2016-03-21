var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var Promise = require('promise');

var url = 'mongodb://localhost:27017/test';
/*
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server.");
  db.close();
});
*/


var insertDocument = function(db) {
   var document = db.collection('restaurants').insertOne( {
      "address" : {
         "street" : "2 Avenue ddd",
         "zipcode" : "10075",
         "building" : "1480",
         "coord" : [ -73.9557413, 40.7720266 ]
      },
      "borough" : "Manhattan",
      "cuisine" : "Italian",
      "grades" : [
         {
            "date" : new Date("2014-10-01T00:00:00Z"),
            "grade" : "A",
            "score" : 11
         },
         {
            "date" : new Date("2014-01-16T00:00:00Z"),
            "grade" : "B",
            "score" : 17
         }
      ],
      "name" : "Vella",
      "restaurant_id" : "41704620"
   });
   return document;
};

/*
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  insertDocument(db, function() {
      db.close();
  });
});
*/

function doSomething(db) {
          console.log('Do something');
          console.log(db);  
}

DB = require('./db');

function cb() {
  
}

DB.connect(cb)
        .then(insertDocument)
        .finally(DB.close);