module.exports = (sequelize, Sequelize) => {
	const Todo = sequelize.define("todo", {
		content: {
			type: Sequelize.TEXT,
		},
		priority: {
			type: Sequelize.INTEGER,
		},
	});
	return Todo;
};
