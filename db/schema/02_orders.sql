DROP TABLE IF EXISTS orders CASCADE;

CREATE TYPE status AS ENUM ('placed', 'ready', 'complete');

CREATE TABLE orders (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  prep_time_duration INTEGER,
  status status DEFAULT 'placed'
);


