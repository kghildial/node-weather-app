const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const PORT = process.env.PORT || 3000;

// Define the paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup the static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
	res.render("index", {
		title: "Weather App",
		name: "Kinshuk Ghildial",
	});
});

app.get("/about", (req, res) => {
	res.render("about", {
		title: "About Me",
		name: "Kinshuk Ghildial",
	});
});

app.get("/help", (req, res) => {
	res.render("help", {
		title: "Help Page",
		name: "Kinshuk Ghildial",
		helpText: "This is a help message!",
	});
});

app.get("/weather", (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: "Address query variable not found!",
		});
	}

	geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
		if (error) {
			return res.send({ error });
		}

		forecast(latitude, longitude, (error, forecastData) => {
			if (error) {
				return res.send({ error });
			}

			res.send({
				forecast: forecastData,
				location,
				address: req.query.address
			})
		});
	});
});

app.get("/products", (req, res) => {
	if (!req.query.search) {
		return res.send({
			error: "You must provide a search term!",
		});
	}

	console.log(req.query);
	res.send({
		products: [],
	});
});

app.get("/help/*", (req, res) => {
	res.render("404", {
		title: "404",
		name: "Kinshuk Ghildial",
		errorMessage: "Help article not found!!!",
	});
});

app.get("*", (req, res) => {
	res.render("404", {
		title: "404",
		name: "Kinshuk Ghildial",
		errorMessage: "My 404 page!",
	});
});

app.listen(PORT, () => {
	console.log(`Server is up on port ${PORT}...`);
});
