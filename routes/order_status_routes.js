const express = require('express');
const { placeOrder, getPlacedOrders } = require('../db/queries/order_queries');
const router = express.Router();

// twilio stuff
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const autoToken = process.env.TWILIO_AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_FROM;
const recipientNumber = process.env.TWILIO_TO;
const client = require('twilio')(accountSid, autoToken);

const userReceivesConfirmation = function() {
  client.messages.create({
    from: twilioNumber, //twilio fake number
    to: recipientNumber, //my phone number
    body: 'Hi Bob, your order has been successfully placed!'
  }).then(() => console.log("Hi User, your order has been successfully placed!!!"))
    .catch((err) => { err.message; });
};

const adminReceivesOrder = function() {
  client.messages.create({
    from: twilioNumber, //twilio fake number
    to: recipientNumber, //my phone number
    body: 'Hi Admin, Bob has placed an order! Please send them an estimated wait time on your desktop/tablet.'
  }).then(() => console.log("Hi Admin, Bob has placed an order! Please send them an estimated wait time on your desktop/tablet."))
    .catch((err) => { err.message; });
};

const userReceivesEstimatedTime = function() {
  const delay = 5;

  client.messages.create({
    from: twilioNumber, //twilio fake number
    to: recipientNumber, //my phone number
    body: `Hi Bob, your order will be ready for pickup in ${delay} minutes.`
  }).then(() => console.log(`Hi Bob, your order will be ready for pickup in ${delay} minutes`))
    .catch((err) => { err.message; });

  setTimeout(() => {
    client.messages.create({
      from: twilioNumber, //twilio fake number
      to: recipientNumber, //my phone number
      body: `Hi Bob, your order is ready for pickup!`
    }).then(() => console.log("Hi Bob, your order is ready for pickup!"))
      .catch((err) => { err.message; });
  }, delay * 1000);
};

// GET order_status/
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
router.post('/', (req, res) => {
  console.log("Place Order button on foods.ejs got clicked!");
  placeOrder();
  userReceivesConfirmation();
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
