var express = require('express');
var router = express.Router();
var Like = require('./lib/service/like');

// Sample user id
var userId = 1;

// Create a like
router.post('/', function (req, res, next) {
  var productId = req.body.productId;
  Like.insert({
    productId: productId,
    userId: userId
  }, function (err, object) {
    if (err) {
      console.log('An error occured when like');
      console.log(err);
      res.send('error');
    } else {
      res.send('success');
    }
  });
});

module.exports = router;
