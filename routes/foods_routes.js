const express = require('express');
const router = express.Router();

const {
  getFoods,
  addFoods,
  editFoods,
  deleteFoods,
  getQuantity
} = require('../db/queries/foods_queries');

const { getPlacedOrders, getOrders: getPendingOrders } = require('../db/queries/order_queries');


// GET foods/
router.get('/', (req, res) => {
  res.render('foods');
});


// GET foods/menu_items
// middle man between backend database and frontend
// returns json data to loadfoods function in app.,
router.get('/menu_items', (req, res) => {
  getFoods()
    .then(foodsArr => {
      console.log("foodsArr", foodsArr);
      res.json(foodsArr);
    })
    .catch((err) => { err.message; });
});


// GET foods/admin
router.get('/admin', (req, res) => {
  res.render('admin_foods');
});


// POST foods/admin
router.post('/admin', (req, res) => {
  console.log("add button on admin_foods.ejs got clicked!");
  console.log("req.body name/price/body", req.body.name, req.body.price, req.body.image_url);
  const newItem = req.body;
  console.log("req.body: ", req.body);
  addFoods(newItem);
  res.redirect('/foods/admin');

});


// GET foods/admin/:foodId
router.get('/admin/:foodId', (req, res) => {
  console.log("edit button on admin_foods.ejs got clicked!");
  res.render('admin_edit');
});


// DELETE /foods/admin/:foodid/delete
// POST for now though, DELETE as stretch
router.post('/admin/:foodId/delete', (req, res) => {
  //console.log("delete button on admin_foods.ejs was clicked!");
  const itemId = req.params.foodId;
  console.log('itemId: ', itemId); // logs 5
  deleteFoods(itemId)
  .catch(err => console.log(err.message));
  res.redirect('/foods/admin');
});


// ---------- IMPLEMENT AS STRETCH ----------
// PATCH foods/admin/:foodId/edit
// POST for now though, PATCH as stretch
// router.post('/admin/:foodId/edit', (req, res) => {
//   console.log("save button on admin_edit.ejs was clicked!");
//   const itemId = req.params.foodId;
//   console.log('itemId: ', itemId); // logs 5
//   editFoods(itemId)
//     .catch(err => console.log(err.message));
//   res.redirect('/foods/admin');
// });
// ---------- IMPLEMENT AS STRETCH ----------

module.exports = router;


