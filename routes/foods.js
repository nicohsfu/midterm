const express = require('express');
const router = express.Router();

// test routes for our 5 EJS templates
router.get('/1', (req, res) => {
  res.render('admin_foods');
});

router.get('/2', (req, res) => {
  res.render('admin_edit');
});

router.get('/3', (req, res) => {
  res.render('admin_orders');
});

router.post('/3', (req, res) => {
  console.log("Place Order button on foods.ejs got clicked!");
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
  console.log("add button on admin_foods.ejs got clicked!");
  // // move this entire function out of here
  // // refer to the tweeter project
  // const addFood = function(food) {

  //   // write all queries in separate functions elsewhere, and then call it here
  //   // don't do it like lines 48/49

  //   const queryString = `
  //     INSERT INTO foods (name, description, price)
  //     VALUES ($1, $2, $3)
  //   `;

  //   const queryParams = [`${food.name}`, `${food.description}`, `${food.price}`];

  //   return pool
  //     .query(queryString, queryParams)
  //     .then(result => {
  //       console.log("result.rows[0]: ", result.rows[0]);
  //       result.rows[0];
  //     })
  //     .catch(error => console.log("error: ", error));
  // };

  // // call the function here, line 66-72 stays here
  // addFood({ ...req.body })
  //   .then(food => {
  //     res.send(food);
  //   })
  //   .catch(e => {
  //     console.error(e);
  //     res.send(e);
  //   });

  res.redirect('/foods/admin');
});

// GET foods/admin/:foodId
router.get('/admin/:foodId', (req, res) => {
  console.log("edit button on admin_foods.ejs got clicked!")
  res.render('admin_edit');
});

// PATCH foods/admin/:foodId/edit
// POST for now though, PATCH as stretch
router.post('/admin/:foodId/edit', (req, res) => {
  console.log("save button on admin_edit.ejs was clicked!")
  res.redirect('/foods/admin');
});

// DELETE /foods/admin/:foodid/delete
// POST for now though, DELETE as stretch
router.post('/admin/:foodId/delete', (req, res) => {
  console.log("delete button on admin_foods.ejs was clicked!")
  res.redirect('/foods/admin');
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
