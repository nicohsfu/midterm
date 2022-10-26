const db = require('../connection');

const getUsers = () => {
  return db.query(`
    SELECT * FROM users;
  `)
    .then(data => {
      return data.rows;
    })
    .catch((err) => { err.message; });
};

module.exports = { getUsers };
