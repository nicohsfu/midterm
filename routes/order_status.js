const express = require('express');
const router = express.Router();

// GET order_status/
router.get('/', (req, res) => {
  res.render('checkout');
});

// POST order_status/
router.post('/', (req, res) => {
  res.render('checkout');
});

// PATCH order_status/admin/:order_id/edit
// POST for now though, PATCH as stretch
router.post('/admin/:order_id/edit', (req, res) => {
  res.render('checkout');
});

module.exports = router;
