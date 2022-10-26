const express = require('express');
const { incrementItem, decrementItem } = require('../db/queries/order_queries');
const router = express.Router();


// PATCH cart/:cartId/edit
// POST for now though, PATCH as stretch
router.post('/:cartId/edit', (req, res) => {
  console.log("req.body: ", req.body);

  if (req.body.action === 'decrement') {
    //console.log("req.params decrement:", req.params); //{ cartId: ':cartId }

    decrementItem(req.params.cartId)
      .then(data => {
        res.json(data[0]);
        console.log("post decrement working", data[0]);
      })
      .catch((err) => { console.log(err.message); });
  }

  if (req.body.action === 'increment') {
    console.log("req.params increment: ", req.params);

    incrementItem(req.params.cartId)
      .then(data => {
        res.json(data[0]);
        console.log('post increment working', data[0]);
      })
      .catch((err) => { console.log(err.message); });
  }
});


module.exports = router;
