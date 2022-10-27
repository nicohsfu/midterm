const express = require('express');
const router = express.Router();

const { placeOrder, getPlacedOrders } = require('../db/queries/order_queries');

// Twilio credentials
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const autoToken = process.env.TWILIO_AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_FROM;
const recipientNumber = process.env.TWILIO_TO;
const client = require('twilio')(accountSid, autoToken);


// Twilio SMS functions
const userReceivesConfirmation = function() {
  client.messages.create({
    from: twilioNumber,
    to: recipientNumber,
    body: 'Hi Bob, your order has been successfully placed!'
  }).then(() => console.log("SMS: Hi Bob, your order has been successfully placed!"))
    .catch((err) => { err.message; });
};

const adminReceivesOrder = function() {
  client.messages.create({
    from: twilioNumber,
    to: recipientNumber,
    body: 'Hi Admin, Bob has placed an order! Please send them an estimated wait time on your desktop/tablet.'
  }).then(() => console.log("SMS: Hi Admin, Bob has placed an order! Please send them an estimated wait time on your desktop/tablet."))
    .catch((err) => { err.message; });
};

const userReceivesEstimatedTime = function() {
  const delay = 5;

  client.messages.create({
    from: twilioNumber,
    to: recipientNumber,
    body: `Hi Bob, your order will be ready for pickup in 10 minutes.`
  }).then(() => console.log(`SMS: Hi Bob, your order will be ready for pickup in 10 minutes`))
    .catch((err) => { err.message; });

  setTimeout(() => {
    client.messages.create({
      from: twilioNumber,
      to: recipientNumber,
      body: `Hi Bob, your order is ready for pickup!`
    }).then(() => console.log("SMS: Hi Bob, your order is ready for pickup!"))
      .catch((err) => { err.message; });
  }, delay * 1000);
};


// GET order_status/
// Order status page for user
router.get('/', (req, res) => {
  console.log("this should be the order page");

  let placedOrders;

  getPlacedOrders()
    .then((value) => {
      placedOrders = value;
    })
    .then(() => {
      const templateVars = {
        placedOrders,
        runningPrice: 0
      };

      console.log('placedOrders routes file: ', placedOrders);
      res.render('order', templateVars);
    });
});

// POST order_status/
// User recieves order confirmation SMS and admin recieves new order SMS
router.post('/', (req, res) => {
  console.log("Place Order button on foods.ejs got clicked!");

  placeOrder();
  userReceivesConfirmation();
  adminReceivesOrder();

  res.redirect('/order_status');
});

// GET order_status/admin/:order_id
// Admin incoming orders page
router.get('/admin/:order_id', (req, res) => {
  let placedOrders;

  getPlacedOrders()
    .then((value) => {
      placedOrders = value;
    })
    .then(() => {
      const templateVars = {
        placedOrders,
        runningPrice: 0
      };

      console.log('placedOrders routes file: ', placedOrders);
      res.render('admin_orders', templateVars);
    });
});

// POST order_status/admin/:order_id
// Admin sends user estimated time of pickup SMS
router.post('/admin/:order_id', (req, res) => {
  userReceivesEstimatedTime();
  res.redirect('/order_status/admin/:order_id');
});


module.exports = router;
