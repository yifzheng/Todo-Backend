const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 8080;

let corsOptions = {
	origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

// parse requests of content-type: application-json
app.use(express.json());

// parse requests of content-type: appplication/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// import db models
const db = require("./app/models");

//sync to database
db.sequelize
	.sync({ alter: true })
	.then(() => {
		console.log("Synced with Database");
	})
	.catch((err) => {
		console.log("Failed to sync to Database", err);
	});

// simple route: HOME
app.get("/", (req, res) => {
	res.status(200).json({ message: "Welcome to the TODOS Application" });
});

// routes of the api
require("./app/routes/todo.routes.js")(app);

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
