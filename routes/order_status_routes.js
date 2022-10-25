const express = require('express');
const { placeOrder, getPlacedOrders } = require('../db/queries/order_queries');
const router = express.Router();

// twilio stuff
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const autoToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, autoToken);

const sendCustomerMessage = function() {
  client.messages.create({
    from: '14243378014', //twilio fake number
    to: '16047674603', //my phone number
    body: 'Hi Minha, your order has been successfully placed!!!'
  }).then(() => console.log("Message successfully sent."));
};

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

// GET order_status/admin/:order_id
router.get('/admin/:order_id', (req, res) => {
  getPlacedOrders();
  res.render('admin_orders');
});

// PATCH order_status/admin/:order_id
// POST for now though, PATCH as stretch
router.post('/admin/:order_id', (req, res) => {
  sendCustomerMessage();
  res.redirect('/order_status/admin/:order_id');
});

module.exports = router;
