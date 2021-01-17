"use strict"
const path = require('path')
const orm = require("./config/orm.js")
const express = require("express")
const exphbs = require("express-handlebars")


var app = express();

var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

require("./routes/api-routes.js")(app);

app.get("/", function(req, res) {
    //res.end('<HTML><head><title>the title</title></head><body>the body</body></HTML>')
    res.render("index", { allfood: [
        {id:1, food: "stuff", eaten: false},
        {id:2, food:"other stuff", eaten: false},
        {id:3, food:"an eaten food", eaten: true},
    ] });
})

app.post("/", function(req, res) {
})

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });


// this isn't called anymore, but I want the code as sample code for when I do start
// to use my orm
async function main() {
    //await orm.query("DROP DATABASE IF EXISTS pets_db;")
    
    
    await orm.seedFrom("./db/schema.sql")
    await orm.seedFrom("./db/seeds.sql")
    
    await orm.usePetsDatabase()
    // Find all the pets ordering by the lowest price to the highest price.
    await orm.selectAndOrder("animal_name", "pets", "price");

    // Find a pet in the pets table by an animal_name of Rachel.
    await orm.selectWhere("pets", "animal_name", "Rachel");

    // Find the buyer with the most pets.
    await orm.findWhoHasMost("buyer_name", "buyer_id", "buyers", "pets");

    await orm.close()
}

//main()
