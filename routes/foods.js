const express = require('express');
const router = express.Router();


// test routes

router.get('/1', (req, res) => {
  res.render('admin_foods');
});

router.get('/2', (req, res) => {
  res.render('admin_edit');
});

router.get('/3', (req, res) => {
  res.render('admin_orders');
});

router.get('/4', (req, res) => {
  res.render('foods');
});

router.get('/5', (req, res) => {
  res.render('order');
});

// -----------

// GET foods/ ✅
router.get('/', (req, res) => {
  res.render('foods');
});

// GET foods/admin
router.get('/admin', (req, res) => {
  res.render('admin_foods');
});

// POST foods/admin
router.post('/admin', (req, res) => {

  // move this entire function out of here
  // refer to the tweeter project
  const addFood = function(food) {

    // write all queries in separate functions elsewhere, and then call it here
    // don't do it like lines 48/49

    const queryString = `
      INSERT INTO foods (name, description, price)
      VALUES ($1, $2, $3)
    `;

    const queryParams = [`${food.name}`, `${food.description}`, `${food.price}`];

    return pool
      .query(queryString, queryParams)
      .then(result => {
        console.log("result.rows[0]: ", result.rows[0]);
        result.rows[0];
      })
      .catch(error => console.log("error: ", error));
  };

  // call the function here, line 65-72 stays here
  addFood({ ...req.body })
    .then(food => {
      res.send(food);
    })
    .catch(e => {
      console.error(e);
      res.send(e);
    });


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

// for reference:
// const addProperty = function(property) {
//   const { owner_id, title, description } = property;

//   const queryString = `
//     INSERT INTO properties (id, title, description)
//     VALUES($1, $2, $3) RETURNING *;
//   `;

//   const queryParams = [owner_id, title, description];

//   return pool.query(queryString, queryParams)
//     .then(result => result.rows[0])
//     .catch(err => console.log(err.message));
// };
