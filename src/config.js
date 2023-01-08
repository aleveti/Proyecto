const { config } = require('dotenv');
config();

const configdb = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME
};

module.exports = { configdb }