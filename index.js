var express = require("express");
var path = require("path");
var fs = require("fs");
var bp = require("body-parser");
var ejsLayouts = require("express-ejs-layouts");

var app = express();

app.use(express.static(path.join(__dirname, "static")));
app.set("view engine", "ejs");
app.use(bp.urlencoded({extended: false}));
app.use("ejsLayouts");

// GET / - Returns all games
app.get("/", function(req, res) {
	var games = fs.readFileSync("./data.json");
	games = JSON.parse(games);
	res.json(games);
});



app.listen(3000);