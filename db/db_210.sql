-- Create table for user authentication
-- Assumes postgresql role is in psql and connected to db atl

CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	username VARCHAR(64),
	password VARCHAR(1024)
);