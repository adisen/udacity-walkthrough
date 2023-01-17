/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS users(id SERIAL PRIMARY KEY, firstname VARCHAR(50), lastname VARCHAR(50), username VARCHAR(30) UNIQUE, password VARCHAR);
