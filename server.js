"use strict"
const path = require('path')
const orm = require("./config/orm.js")
const express = require("express")
const exphbs = require("express-handlebars")
const apiRoutes = require("./routes/api-routes.js")
const burger = require("./models/burger");


var app = express();

var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//require("./routes/api-routes.js")(app);
app.use(apiRoutes);

main().then(x => {
    // console.log("this'll actually happen because main's promise DOES complete");
    // hanging events cause the process to stay alive
    // it is meant as a top-level entrypoint.  And, in fact, it kicks off the server
})

async function main() {
    //await orm.query("DROP DATABASE IF EXISTS pets_db;")
    
    // I shouldn't do this unconditionally
    await orm.seedFrom("./db/schema.sql")
    await orm.seedFrom("./db/seeds.sql")
    
    await orm.useBurgersDatabase()
    // Find all the pets ordering by the lowest price to the highest price.
    // await orm.selectAndOrder("animal_name", "pets", "price");

    // Find a pet in the pets table by an animal_name of Rachel.
    // await orm.selectWhere("pets", "animal_name", "Rachel");

    // Find the buyer with the most pets.
    // await orm.findWhoHasMost("buyer_name", "buyer_id", "buyers", "pets");


    let allfood = [];

    try{
    //await orm.close()
    allfood = await burger.selectAll();

    console.log("allfood: ", allfood);
    } catch(e) {
        console.error(e);
    }

    app.get("/", function(req, res) {
        //res.end('<HTML><head><title>the title</title></head><body>the body</body></HTML>')
        res.render("index", { allfood: allfood });
    })

    console.log("allfood: ", allfood);
    
    app.listen(PORT, function() {
        console.log("App listening on PORT " + PORT);
      });   
}
