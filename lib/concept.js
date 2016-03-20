/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var Transaction = DB.Transaction;
product_id = 
Transaction.autoCommit(function () {
    Like.insert({});
    Product.increaseLike();
}, function (likeObject) {
  
});

Transaction.start();

try {
  Transaction.commit();  
} catch (e) {
  Transaction.rollback();
}

