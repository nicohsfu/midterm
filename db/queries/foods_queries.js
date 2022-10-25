const db = require('../connection');

const getFoods = () => {
  return db.query('SELECT * FROM foods;')
    .then(data => {
      console.log("menu items for getFoods: ", data.rows);
      return data.rows;
    });
};

const addFoods = (foods) => {
  const values = [foods.name, foods.description, foods.image_url, foods.price];
  const query = `
    INSERT INTO foods (name, description, image_url, price)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;

  return db.query(query, values)
    .then(data => {
      console.log("data.rows[0] for addFoods: ", data.rows[0]);
      return data.rows[0];
    });
};

const editFoods = (foods) => {
  const values = [foods.name, foods.description, foods.image_url, foods.price];
  const query = `
    UPDATE foods
    SET name = $1, description = $2, image_url = $3, price = $4
    WHERE id = 1
    RETURNING *;
  `;

  return db.query(query, values)
    .then(data => {
      console.log("data.rows for editFoods: ", data.rows[0]);
      return data.rows[0];
    });
};

const deleteFoods = () => {
  // const values = [foods.id];

  // make dynamic later
  const query = `
    DELETE FROM foods
    WHERE id = 1
  `;

  return db.query(query)
    .then(data => {
      return data.rows[0];
    });
};

// move somewhere else eventually
const getQuantity = () => {
  const query = `
    SELECT quantity
    FROM cart_items
    WHERE id = 1
  `;

  db.query(query)
    .then(data => {
      console.log("data.rows[0].quantity for getQuantity", data.rows[0].quantity);
      return data.rows[0].quantity;
    });
};

module.exports = {
  getFoods,
  addFoods,
  editFoods,
  deleteFoods,
  getQuantity
};
