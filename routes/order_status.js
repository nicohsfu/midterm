const express = require('express');
const router = express.Router();

// GET order_status/
router.get('/', (req, res) => {
  res.render('order');
});

// POST order_status/
router.post('/', (req, res) => {
  res.redirect('/');
});

// GET order_status/admin/:order_id/edit
router.get('/admin/:order_id/edit', (req, res) => {
  res.render('order');
});

// PATCH order_status/admin/:order_id/edit
// POST for now though, PATCH as stretch
router.post('/admin/:order_id/edit', (req, res) => {
  res.redirect('/admin/:order_id');
});

module.exports = router;
