var express = require('express');
var router = express.Router();
var Like = require('../lib/like');
var Product = require('../lib/product');
// Sample user id
var userId = 1;

// Create a like
router.post('/', function(req, res, next) {
  var productId = parseInt(req.body.id);
  Product.has(productId).then(function(doc) {

    //
    // Check product, if product is not available, create one
    //
    if (doc == null) {
      return Product.save({
        'productId': productId,
        'name': req.body.name
      });
    }
    return true;

  }).then(function() {

    //
    // Create new like for product and response
    //
    var data = {
      productId: productId,
      userId: 1
    }
    return Like.save(data, function(err, rs) {
      res.send('success');
    });

  }).catch(function(err) {

    res.send('error');

  });

});

module.exports = router;
