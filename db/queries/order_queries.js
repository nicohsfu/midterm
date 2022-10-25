const db = require('../connection');

const incrementItem = () => {

  const query = 'UPDATE cart_items SET quantity = (quantity + 1) WHERE id = 1 RETURNING *';

  return db.query(query)
    .then(data => {
      console.log("data.rows:", data.rows);
      return data.rows;
    });

};


const decrementItem = () => {

  const query = `UPDATE cart_items SET quantity = (quantity - 1) WHERE id = 1 RETURNING *`;

  return db.query(query)
    .then(data => {
      console.log("data.rows:", data.rows);
      return data.rows;
    });
};


const placeOrder = () => {

  const query = `UPDATE orders SET status = 'placed' WHERE id = 1 RETURNING *`;

  return db.query(query)
    .then(data => {
      console.log("data.rows:", data.rows);
      return data.rows;
    });
};

module.exports = { incrementItem, decrementItem, placeOrder };
