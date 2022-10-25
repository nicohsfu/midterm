const express = require('express');
const { placeOrder, getPlacedOrders } = require('../db/queries/order_queries');
const router = express.Router();

// twilio stuff
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const autoToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, autoToken);

const adminReceivesOrder = function() {
  client.messages.create({
    from: '14243378014', //twilio fake number
    to: '16047674603', //my phone number
    body: 'Hi Admin, Bob has placed an order! Please send them an estimated wait time on your desktop/tablet.'
  }).then(() => console.log("Hi Admin, Bob has placed an order! Please send them an estimated wait time on your desktop/tablet."))
    .catch((err) => { err.message; });
};

const userReceivesOrderConfirmation = function() {
  client.messages.create({
    from: '14243378014', //twilio fake number
    to: '16047674603', //my phone number
    body: 'Hi Bob, your order has been successfully placed!'
  }).then(() => console.log("Hi User, your order has been successfully placed!!!"))
    .catch((err) => { err.message; });
};

const userReceivesEstimatedTime = function() {
  client.messages.create({
    from: '14243378014', //twilio fake number
    to: '16047674603', //my phone number
    body: 'Hi Bob, your order will be ready for pickup in 10 minutes.'
  }).then(() => console.log("Hi Bob, your order will be ready for pickup in 10 minutes."))
    .catch((err) => { err.message; });
};

// GET order_status/
router.get('/', (req, res) => {
  console.log("this should be order page");
  res.render('order');
});

// POST order_status/
router.post('/', (req, res) => {
  console.log("Place Order button on foods.ejs got clicked!");
  userReceivesOrderConfirmation();
  adminReceivesOrder();
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
  userReceivesEstimatedTime();
  res.redirect('/order_status/admin/:order_id');
});

module.exports = router;
