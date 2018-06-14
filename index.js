var express = require("express");
var path = require("path");
var fs = require("fs");
var bp = require("body-parser");
var ejsLayouts = require("express-ejs-layouts");

var app = express();

app.use(express.static(path.join(__dirname, "static")));
app.set("view engine", "ejs");
app.use(bp.urlencoded({extended: true}));
// app.use(ejsLayouts);

// GET / - Returns all games
app.get("/games", function(req, res) {
	var games = fs.readFileSync("./data.json");
	games = JSON.parse(games);
	res.render("games/index", {games: games});
});

// GET /games/new - Returns the form for adding (CREATE)
app.get("/games/new", function(req, res) {
	res.render("games/new");
});

// POST / - Adds a new game
app.post("/games", function(req, res) {
	var games = fs.readFileSync("./data.json");
	games = JSON.parse(games);
	games.push({name: req.body.name, rating: req.body.rating});
	fs.writeFileSync("./data.json", JSON.stringify(games));
	res.redirect("/games");
});

// TODO GET /games/:id - gets one game
app.get("/games/:id", function(req, res) {
	var games = fs.readFileSync("./data.json");
	games = JSON.parse(games);
	var gameIndex = req.params.id;
	if (gameIndex >= games.length) {
		res.json({name: null, rating: null});
	} else {
		res.render("games/show", {game: games[gameIndex]});
	};
});

// TODO PUT /games/:id/ - updates one game
app.put("/games/:id", function(req, res) {
	var games = fs.readFileSync("./data.json");
	games = JSON.parse(games);
	var gameIndex = req.params.id;
	if (gameIndex >= games.length) {
		res.json({name: null, rating: null});
	} else {
		games[gameIndex] = {name: req.body.name, rating: req.body.rating};
		fs.writeFileSync("./data.json", JSON.stringify(games));
		res.json(games);
	};
});

// TODO DELETE /games/:id - deletes one game
app.delete("/games/:id", function(req, res) {
	var games = fs.readFileSync("./data.json");
	games = JSON.parse(games);
	var gameIndex = req.params.id;
	if (gameIndex >= games.length) {
		res.json({name: null, rating: null});
	} else {
		games.splice(gameIndex, 1);
		fs.writeFileSync("./data.json", JSON.stringify(games));
		res.json(games);
	};
});

app.listen(3000);