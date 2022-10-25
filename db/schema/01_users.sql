DROP TABLE IF EXISTS users CASCADE;
DROP TYPE IF EXISTS role CASCADE;

CREATE TYPE role AS ENUM ('customer', 'admin');

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(32) NOT NULL,
  role role DEFAULT 'customer'
);

-- when making changes to the database, run:
-- npm run db:reset
