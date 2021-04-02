const router = require("express").Router();
var orm = require("../config/orm.js");

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

module.exports = router;
