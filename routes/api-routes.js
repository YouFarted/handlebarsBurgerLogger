const router = require("express").Router();
const { json } = require("express");
var orm = require("../config/orm.js");
const burger = require("../models/burger");

router.get("/api/todos", function (req, res) {
  orm.getTodos(function (results) {
    res.json(results);
  });
});

router.post("/api/todos", function (req, res) {
  orm.addTodo(req.body, function (results) {
    res.json(results);
  });
});

router.delete("/api/todos/:id", function (req, res) {
  orm.deleteTodo(req.params.id, function (results) {
    res.json(results);
  });
});

router.put("/api/todos", function (req, res) {
  orm.editTodo(req.body, function (results) {
    res.json(results);
  });
});

///////////// C.R.U.D /////////////


// Create
router.post("/api/burgers", async function (req, res) {
  try {
    const insertResult = await burger.insertOne(req.body.name);
    res.json(insertResult);
  } catch (ex) {
    console.error(ex);
    res.status(500).json(ex);
  }
});

// Read
router.get("/api/burgers", async function (req, res) {

});

// Update
router.put("/api/burgers/:id", async function (req, res) {
  try {
    var whereCondition = { id: req.params.id };

    // one would think the use of
    // app.use(express.urlencoded({ extended: true }));
    // would make this unnecessary but, sadly, one would be wrong.

    const jsonParsedDevoured = JSON.parse(req.body.devoured);

    // Don't let the sql schema fool you, mysql actually treats boolean rows as 
    // tinyints.  Even when you define a column in the schema to have type
    // boolean as i've done, the mysql parser STILL trips all over itself when
    // a value of true-or-false is sent.  It needs 0-or-1 to go in.
    // these are pathetic, half-baked semantics if you ask me.

    const devoured = jsonParsedDevoured ? 1 : 0;

    const updateResults = await burger.updateOne({ devoured: devoured }, whereCondition);
    res.json(updateResults);
  } catch (e) {
    console.error(e);
    res.status(500).json(e);
  }
});

// Delete
router.delete("/api/burgers/:id", async function (req, res) {
  const deleteResult = await burger.deleteOne(req.params.id)
});



module.exports = router;
