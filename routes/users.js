/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

// hello from Nico

router.get('/', (req, res) => {
  res.render('users');
});
<<<<<<< HEAD

// this is a PUUSUDSUDSHHHH
=======
>>>>>>> 49c55e6135fbad0851ef4006547638ed8e272524

module.exports = router;
