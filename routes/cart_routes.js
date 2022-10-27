const express = require('express');
const router = express.Router();

const { incrementItem, decrementItem } = require('../db/queries/order_queries');


// PATCH cart/:cartId/edit
// Make edits to quantity in cart
router.post('/:cartId/edit', (req, res) => {
  console.log("req.body: ", req.body);

  if (req.body.action === 'decrement') {
    decrementItem(req.params.cartId)
      .then(data => {
        res.json(data[0]);
        console.log("post decrement working", data[0]);
      })
      .catch((err) => { console.log(err.message); });
  }

  if (req.body.action === 'increment') {
    incrementItem(req.params.cartId)
      .then(data => {
        res.json(data[0]);
        console.log('post increment working', data[0]);
      })
      .catch((err) => { console.log(err.message); });
  }
});


module.exports = router;
