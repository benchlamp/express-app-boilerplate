//"mongodb://benchlamp:Deuce74011@ds147052.mlab.com:47052/jamesrea83";

var express = require("express"),
    mongoose = require("mongoose"),
    routes = require("./app/routes/index.js"),
    dbLogin = require("./dbLogin"),
    clickHandler = require("./app/controllers/clickHandler.server.js")

var app = express();

mongoose.connect(dbLogin);

var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error"));
db.once("open", function() {
    console.log("db connection established.");
})


clickHandler(db);

app.use("/public", express.static(process.cwd() + "/public"));
app.use("/controllers", express.static(process.cwd() + "/app/controllers"));

routes(app, db);


app.listen(process.env.PORT, function() {
    console.log("Listening on port process.env.PORT");
})

