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

async function main() {

    try {
        const seed = process.argv.find(arg => arg === "seed");
        const onlySeed = process.argv.find(arg => arg === "onlySeed");
        if (seed || onlySeed) {
            await orm.seedFrom("./db/schema.sql")
            await orm.seedFrom("./db/seeds.sql")
        }
        if (onlySeed) {
            await orm.close()
            return;
        }

        await orm.useBurgersDatabase()
    } catch (ex) {
        console.err("exception during async server startup: ", ex);
    }

    app.get("/", async function (req, res) {

        try {
            const burgers = await burger.selectAll();
            console.log("burgers: ", burgers);
            res.render("index", { burgers: burgers });
        } catch (ex) {
            res.status(500).json(ex);
        }
    })

    app.listen(PORT, function () {
        console.log("App listening on PORT " + PORT);
    });
}
