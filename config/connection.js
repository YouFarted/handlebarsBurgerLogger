require('dotenv').config();
const path = require('path')
const Database = require(path.join(__dirname, '..', 'lib', 'database'))

const localConfig = {
  host: "localhost",
  port: 3306,
  user: "root",
  password: process.env.MYSQLROOTPASSWORD,
  database: "sys"
}

let config = process.env.JAWSDB_URL || localConfig
console.info("sqlconfig: " + JSON.stringify(config))

const connection = new Database(config)

module.exports = connection;
