const express = require('express');
const { placeOrder } = require('../db/queries/order_queries');
const router = express.Router();

// GET order_status/
router.get('/', (req, res) => {
  console.log("this should be order page");
  res.render('order');
});

// POST order_status/
router.post('/', (req, res) => {
  console.log("Place Order button on foods.ejs got clicked!");
  placeOrder();
  res.redirect('/order_status');
});

// GET order_status/admin/:order_id/edit
router.get('/admin/:order_id/edit', (req, res) => {
  res.render('admin_orders');
});

// PATCH order_status/admin/:order_id/edit
// POST for now though, PATCH as stretch
router.post('/admin/:order_id/edit', (req, res) => {
  res.redirect('/admin/:order_id');
});

module.exports = router;
