var connection = require("./connection.js");

// Object Relational Mapper (ORM)

async function connect() {
  return await connection.connect()
}

async function useBurgersDatabase(){
  await connection.query("USE burgers")
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

async function selectAll(tableInput) {
  var queryString = "SELECT * FROM ??"
  let results = await connection.query(queryString, [tableInput]);
  return results;
}

async function selectAndOrder(whatToSelect, table, orderCol) {
    var queryString = "SELECT ?? FROM ?? ORDER BY ?? DESC"
    console.log(queryString)
    let result = await connection.query(queryString, [whatToSelect, table, orderCol])
    console.log(result)
}

async function updateOne(tableInput, updateToValue, matchCriteria) {
  // is '?' sufficient or do I need '??' or must I string replace?
  const queryString = "UPDATE ?? SET ? WHERE ??";

  let result = await connection.query(
    queryString,
    [tableOneCol, updateToValue, matchCriteria]
  );

  return result;
}

var orm = {}
orm.connect            = connect;
orm.close              = close;
orm.seedFrom           = seedFrom;
orm.selectWhere        = selectWhere;
orm.selectAndOrder     = selectAndOrder;
orm.findWhoHasMost     = findWhoHasMost;
orm.useBurgersDatabase = useBurgersDatabase;
orm.selectAll          = selectAll;
orm.updateOne          = updateOne;

module.exports = orm;
