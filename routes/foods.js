const express = require('express');
const router = express.Router();

// GET foods/
router.get('/', (req, res) => {
  res.render('foods');
});

// GET foods/admin
router.get('/admin', (req, res) => {
  res.render('admin_foods');
});

// POST foods/admin
router.post('/admin', (req, res) => {
  res.redirect('admin_foods');
});

// GET foods/admin/:foodId
router.get('/admin/:foodId', (req, res) => {
  res.render('admin_foods');
});

// PATCH foods/admin/:foodId/edit
// POST for now though, PATCH as stretch
router.post('/admin/:foodId/edit', (req, res) => {
  res.redirect('/admin/:foodId');
});

// DELETE /foods/admin/:foodid/delete
// POST for now though, DELETE as stretch
router.post('/admin/:foodId/delete', (req, res) => {
  res.redirect('admin_foods');
});

module.exports = router;
