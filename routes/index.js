var express = require('express');
var router = express.Router();
var Product = require('../lib/product');


function getSampleProducts() {
  return [
    {
      'productId': 1,
      'name': 'Product 1',
      'countLike': 0
    },  
  ]
}
/* GET home page. */
router.get('/', function(req, res, next) {
  Product.getAll(function (err, products) {
    if (!products.length) {
       products = getSampleProducts();
    }

    res.render('index', {
      products: products
    });    
  });
});

module.exports = router;
