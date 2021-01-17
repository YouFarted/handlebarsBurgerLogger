var connection = require("./connection.js");

// Object Relational Mapper (ORM)

async function connect() {
  return await connection.connect()
}

async function usePetsDatabase(){
  await connection.query("USE pets_db")
}

async function close() {
  return await connection.close()
}

async function seedFrom(filePath) {
  return await connection.seedFrom(filePath)
}

async function selectWhere(tableInput, colToSearch, valOfCol) {
    var queryString = "SELECT * FROM ?? WHERE ?? = ?"
    let results = await connection.query(queryString, [tableInput, colToSearch, valOfCol]);
    console.log(results)
}
async function selectAndOrder(whatToSelect, table, orderCol) {
    var queryString = "SELECT ?? FROM ?? ORDER BY ?? DESC"
    console.log(queryString)
    let result = await connection.query(queryString, [whatToSelect, table, orderCol])
    console.log(result)
}
async function findWhoHasMost(tableOneCol, tableTwoForeignKey, tableOne, tableTwo) {
    var queryString =
      "SELECT ??, COUNT(??) AS count FROM ?? LEFT JOIN ?? ON ??.??= ??.id GROUP BY ?? ORDER BY count DESC LIMIT 1";

    let result = await connection.query(
      queryString,
      [tableOneCol, tableOneCol, tableOne, tableTwo, tableTwo, tableTwoForeignKey, tableOne, tableOneCol]
    )
    console.log(result)
}
var orm = {}
orm.connect         = connect
orm.close           = close
orm.seedFrom        = seedFrom
orm.selectWhere     = selectWhere
orm.selectAndOrder  = selectAndOrder
orm.findWhoHasMost  = findWhoHasMost
orm.usePetsDatabase = usePetsDatabase

module.exports = orm;
