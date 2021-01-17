var orm = require("../config/orm.js");

module.exports = function(app) {

  app.get("/api/todos", function(req, res) {
    orm.getTodos(function(results) {
      res.json(results);
    });
  });

  app.post("/api/todos", function(req, res) {
    orm.addTodo(req.body, function(results) {
      res.json(results);
    });
  });

  app.delete("/api/todos/:id", function(req, res) {
    orm.deleteTodo(req.params.id, function(results) {
      res.json(results);
    });
  });

  app.put("/api/todos", function(req, res) {
    orm.editTodo(req.body, function(results) {
      res.json(results);
    });
  });
};
