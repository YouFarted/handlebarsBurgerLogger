const connection = require("./connection.js");

// Object Relational Mapper (ORM)

async function connect() {
  return await connection.connect()
}

async function dropAndRecreateBurgersDatabase() {
  await connection.query("DROP DATABASE IF EXISTS burgers");
  await connection.query("CREATE DATABASE `burgers`");
}

async function useBurgersDatabase(){
  await connection.query("USE burgers");
}

async function close() {
  return await connection.close();
}

async function seedFrom(filePath) {
  return await connection.seedFrom(filePath);
}

async function selectWhere(tableInput, colToSearch, valOfCol) {
    var queryString = "SELECT * FROM ?? WHERE ?? = ?";
    let results = await connection.query(queryString, [tableInput, colToSearch, valOfCol]);
    console.log(results);
}

async function selectAll(tableInput) {
  var queryString = "SELECT * FROM ??";
  let results = await connection.query(queryString, [tableInput]);
  return results;
}

async function insertOne(tableInput, setData) {
  let queryString = "INSERT INTO ?? SET ?";
  
  const result = await connection.query(queryString, [tableInput, setData] )
  return result;  
}

async function updateOne(tableInput, updateToValue, whereCondition) {
  // The '?' or '??' are insufficient to include the part after the where. 
  // Weak.
  const partialQueryString = "UPDATE ?? SET ? WHERE ";

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

  // This is kind of sleazy and if the whereCondition was particularly dodgy,
  // it could open this up to a sql injection.  It could be wise to look into
  // this possibility more but I consider the problem outside the scope of this
  // project
  let result = await connection.query(
    partialQueryString + conditionText,
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
orm.useBurgersDatabase = useBurgersDatabase;
orm.selectAll          = selectAll;
orm.updateOne          = updateOne;
orm.deleteOne          = deleteOne;
orm.insertOne          = insertOne;
orm.connection         = connection;
orm.dropAndRecreateBurgersDatabase  = dropAndRecreateBurgersDatabase;

module.exports = orm;
