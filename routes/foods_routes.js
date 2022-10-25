const express = require('express');
const {
  getFoods,
  addFoods,
  editFoods,
  deleteFoods,
  getQuantity
} = require('../db/queries/foods_queries');
const router = express.Router();

// test routes for our 5 EJS templates
router.get('/1', (req, res) => {
  res.render('admin_foods');
});

router.get('/2', (req, res) => {
  res.render('admin_edit');
});


router.get('/4', (req, res) => {

  const templateVars = {
    quantity: getQuantity()
  };

  res.render('foods', templateVars);
});

router.get('/5', (req, res) => {
  res.render('order');
});
// -----------

// GET foods/ ✅
router.get('/', (req, res) => {
  // console.log("GET foods/ is working");
  // console.log("req.body", req.body);
  // console.log("req.params", req.params);
  // console.log("req.query", req.query);
  //console.log("GET foods/ response: ", res);
  // if (req.query.action === 'getFoods') {
  //   console.log("inside the if");
  //   getFoods()
  //     .then(foodsArr => {
  //       console.log("foodsArr", foodsArr);
  //       console.log("inside the then inside the if");
  //       // res.render('foods', { foodsArr: foodsArr });
  //       res.json(foodsArr);
  //     })
  //     .catch((err) => { err.message; });
  // }

  res.render('foods');
});

router.get('/menu_item', (req, res) => {
  console.log("inside the if");
  getFoods()
    .then(foodsArr => {
      console.log("foodsArr", foodsArr);
      console.log("inside the then inside the if");
      // res.render('foods', { foodsArr: foodsArr });
      res.json(foodsArr);
    })
    .catch((err) => { err.message; });
});

// GET foods/admin
router.get('/admin', (req, res) => {
  getFoods();
  res.render('admin_foods');
});

// POST foods/admin
router.post('/admin', (req, res) => {
  console.log("add button on admin_foods.ejs got clicked!");
  const newItem = req.body;
  console.log(req.body);
  addFoods(newItem);
  res.redirect('/foods/admin');
});

// GET foods/admin/:foodId
router.get('/admin/:foodId', (req, res) => {
  console.log("edit button on admin_foods.ejs got clicked!");
  res.render('admin_edit');
});

// PATCH foods/admin/:foodId/edit
// POST for now though, PATCH as stretch
router.post('/admin/:foodId/edit', (req, res) => {
  console.log("save button on admin_edit.ejs was clicked!");
  const item = req.body;
  editFoods(item);
  res.redirect('/foods/admin');
});

// DELETE /foods/admin/:foodid/delete
// POST for now though, DELETE as stretch
router.post('/admin/:foodId/delete', (req, res) => {
  console.log("delete button on admin_foods.ejs was clicked!");
  deleteFoods();
  res.redirect('/foods/admin');
});

module.exports = router;


