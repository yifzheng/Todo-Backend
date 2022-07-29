const { reset } = require("nodemon");
const db = require("../models");
const Todo = db.todos;

// POST -> create and save the new Todo
exports.create = (req, res) => {
	// validate the request
	if (!req.body.content) {
		res.status(400).send({
			message: "Content can not be empty!",
		});
		return;
	}

	// Create a Todo
	const todo = {
		content: req.body.content,
		priority: req.body.priority,
	};

	// save todo into database
	Todo.create(todo)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message ||
					"Some error occured while creating the tutorial",
			});
		});
};

// GET ->  Find all the todos in the database
exports.findAll = (req, res) => {
	Todo.findAll()
		.then((data) => {
			console.log("the data", data);
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message ||
					"Some error occured while creating the tutorial",
			});
		});
};

// GET -> Get single todo by id
exports.findOne = (req, res) => {
	Todo.findByPk(req.params.id)
		.then((data) => {
			if (data) {
				res.send(data);
			} else {
				res.status(404).send({
					message: `Cannot find a todo with id=${req.params.id}`,
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: `Error retrieiving Todo with id=${req.params.id}`,
			});
		});
};

// PUT -> Update a single Todo by ID
exports.update = (req, res) => {
	const id = req.params.id;
	Todo.update(req.body, {
		where: { id: id },
	})
		.then((num) => {
			if (num == 1) {
				res.send({
					message: "Todo was updated successfully.",
				});
			} else {
				res.send({
					message: `Cannot update Todo with id=${id}. Maybe Todo was not found or req.body is empty!`,
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: "Error updating Todo with id=" + id,
			});
		});
};

// DELETE -> Delete a single Todo by id
exports.delete = (req, res) => {
	const id = req.params.id;
	Todo.destroy({
		where: { id: id },
	})
		.then((num) => {
			if (num == 1) {
				res.send({
					message: "Todo was deleted successfully!",
				});
			} else {
				res.send({
					message: `Cannot delete Todo with id=${id}. Maybe Todo was not found!`,
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: "Could not delete Todo with id=" + id,
			});
		});
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
	Todo.destroy({
		where: {},
		truncate: false,
	})
		.then((nums) => {
			res.send({
				message: `${nums} Todos were deleted successfully!`,
			});
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message ||
					"Some error occurred while removing all Todos.",
			});
		});
};
