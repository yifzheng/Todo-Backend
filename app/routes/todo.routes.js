module.exports = (app) => {
	const todos = require("../controllers/todo.controller.js");
	let router = require("express").Router();

	//create a new todo
	router.post("/", todos.create);

	//retrieve all todos
	router.get("/", todos.findAll);

    //retrieve a single todo by id
    router.get("/:id", todos.findOne);

    // update a todo by is
    router.put("/:id", todos.update);

    // delete a tutorial with id
    router.delete("/:id", todos.delete);

    // Delete all todos
    router.delete("/", todos.deleteAll);

	app.use("/api/todos", router);
};
