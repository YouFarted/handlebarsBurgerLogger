require('dotenv').config();
const path = require('path')
const Database = require(path.join(__dirname, '..', 'lib', 'database'))

const config = {
  host: "localhost",
  port: 3306,
  user: "root",
  password: process.env.MYSQLROOTPASSWORD,
  database: "pets_db"
}

const connection = new Database(config)

module.exports = connection;
