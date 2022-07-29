const Sequelize = require("sequelize"); // requiring sequelize
require("dotenv").config(); // importing env config to use env variables

// define a sequelize connection with the database
const sequelize = new Sequelize(
	process.env.DATABASE_URL,
	{
		//host: process.env.DB_HOST,
		dialect: 'postgres',
		operatorsAliases: false,
		pool: {
			max: 5,
			min: 0,
			acquire: 30000,
			idle: 10000,
		},
	}
);

// create empty object to store Database Data
const db = {};

db.Sequelize = Sequelize; // assign Sequelize to the empty attribute
db.sequelize = sequelize; // assign sequelize to the empty attribute
db.todos = require("./todo.model.js")(sequelize, Sequelize); // assigning the todo model exported from file into an empty atrribute

module.exports = db; // exprt the db object
