DROP TABLE IF EXISTS foods CASCADE;

CREATE TABLE foods (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  image_url VARCHAR(255),
  -- updated price data type from INTEGER to DECIMAL
  price DECIMAL(10,2) NOT NULL
);
