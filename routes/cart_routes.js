const express = require('express');
const { incrementItem, decrementItem } = require('../db/queries/order_queries');
const router = express.Router();

// POST cart/
// Add items to cart
router.post('/', (req, res) => {

});

// PATCH cart/:cartId/edit
// POST for now though, PATCH as stretch
router.post('/:cartId/edit', (req, res) => {
  console.log("req.body: ", req.body);
  if (req.body.action === 'decrement') {
    decrementItem()
      .then(data => {
        res.json(data[0]);
        console.log("post decrement working", data[0])
      })
      .catch((err) => { err.message; });
  }
  if (req.body.action === 'increment') {
    incrementItem()
      .then(data => {
        res.json(data[0]);
        console.log('post increment working', data[0])
      })
      .catch((err) => { err.message; });
  }

});

// DELETE cart/:cartId/delete
// POST for now though, DELETE as stretch
router.post('/:cartId/delete', (req, res) => {

});

module.exports = router;
