const db = require('../connection');

const getFoods = () => {
  return db.query(`
    SELECT * FROM foods;
  `)
    .then(data => {
      // console.log("menu items for getFoods: ", data.rows);
      return data.rows;
    })
    .catch((err) => { err.message; });
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
    })
    .then((newItem) => {
      console.log("newItem: ", newItem);

      const values2 = [newItem.id];
      const query2 = `
        INSERT INTO cart_items (food_id, order_id, quantity)
        VALUES ($1, 1, 0)
        RETURNING *;
      `;

      return db.query(query2, values2)
        .then(data => {
          console.log("inner data.rows[0] for addFoods: ", data.rows[0]);
          //inner data.rows[0] for addFoods:  { id: 11, food_id: 6, order_id: 1, quantity: 0 }
          return data.rows[0];
        });
    })
    .catch((err) => { err.message; });

};

const editFoods = (foods) => {
  const values = [foods.name, foods.description, foods.image_url, foods.price, foods.id];
  const query = `
    UPDATE foods
    SET name = $1, description = $2, image_url = $3, price = $4
    WHERE id = $5
    RETURNING *;
  `;

  return db.query(query, values)
    .then(data => {
      console.log("data.rows for editFoods: ", data.rows[0]);
      return data.rows[0];
    })
    .catch((err) => { err.message; });
};

const deleteFoods = (id) => {
  const values = [id];

  const query = `
    DELETE FROM foods
    WHERE id = $1
    RETURNING *;
  `;

  return db.query(query, values)
    .then(data => {
      return data.rows[0];
    })
    .catch((err) => { err.message; });
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
    })
    .catch((err) => { err.message; });
};

module.exports = {
  getFoods,
  addFoods,
  editFoods,
  deleteFoods,
  getQuantity
};
