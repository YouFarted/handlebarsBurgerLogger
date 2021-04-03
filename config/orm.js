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

async function updateOne(tableInput, updateToValue, whereCondition) {
  // is '?' sufficient or do I need '??' or must I string replace?
  let queryString = "UPDATE ?? SET ? WHERE ";

  // whereCondition is an object.  I need to convert it
  console.log("whereCondition: ", whereCondition);

  const whereKeys = Object.keys(whereCondition);
  if(whereKeys.length !== 1) {
    throw Error("only a single condition is supported until I care to chare to change it");
  }
  let conditionText = "";

  for(let i=0; i<whereKeys.length; ++i) {
    const key = whereKeys[i];
    const value = whereCondition[key];
    conditionText += key;
    conditionText += " = ";
    conditionText += value;
    // I should add some AND's to support multiple conditions
  }
  queryString += conditionText;

  let result = await connection.query(
    queryString,
    [tableInput, updateToValue]
  );

  return result;
}

async function deleteOne(tableInput, id) {
  const queryString = "DELETE from ?? WHERE ID = ?";
  let result = await connection.query(
    queryString,
    [tableInput, id]
  );

  return result;
}

var orm = {}
orm.connect            = connect;
orm.close              = close;
orm.seedFrom           = seedFrom;
orm.selectWhere        = selectWhere;
orm.selectAndOrder     = selectAndOrder;
orm.useBurgersDatabase = useBurgersDatabase;
orm.selectAll          = selectAll;
orm.updateOne          = updateOne;
orm.deleteOne          = deleteOne;

module.exports = orm;
