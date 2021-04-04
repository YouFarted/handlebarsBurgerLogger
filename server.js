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

app.use(apiRoutes);

main().then(x => {
    // console.log("this'll actually happen because main's promise DOES complete");
    // hanging events cause the process to stay alive
    // it is meant as a top-level entrypoint.  And, in fact, it kicks off the server
}).catch(e => {
    console.error("Uncaught exception made it to the top: ", e);
});

function isUsingLocalMysql(){
    return (typeof(orm.connection.config) !== "string");
}

async function main() {

    try {
        // if it is a string, it is using JAWS_DB which puts us in some
        // fixed database, making USE <database> inappropriate
        // for local mysql connections, however, I connect using the sys
        // database so that I may create/drop the burgers database at will
        // in its entirety
        
        /*
        if (isUsingLocalMysql()) {
            // JAWS connects me to a fixed database and USE <db-name>
            // is inappropriate
            await orm.dropAndRecreateBurgersDatabase();
            await orm.useBurgersDatabase();
        }
        */

        const seed = process.argv.find(arg => arg === "seed");
        const seedOnly = process.argv.find(arg => arg === "seedOnly");
        if (seed || seedOnly) {

            if (isUsingLocalMysql()) {
                await orm.dropAndRecreateBurgersDatabase();
                await orm.useBurgersDatabase();
            }
            await orm.seedFrom("./db/schema.sql");
            await orm.seedFrom("./db/seeds.sql");            
        }
        if (seedOnly) {
            await orm.close();
            return;
        }

    } catch (ex) {
        console.error("exception during async server startup: ", ex);
    }

    app.get("/", async function (req, res) {

        try {
            const burgers = await burger.selectAll();
            
            res.render("index", { burgers: burgers });
        } catch (ex) {
            res.status(500).json(ex);
        }
    })

    app.listen(PORT, function () {
        console.log("App listening on PORT " + PORT);
    });
}
