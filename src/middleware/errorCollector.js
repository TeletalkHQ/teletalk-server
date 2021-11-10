const errorCollector = (req, res, next) => {
	res.errors = [];
	res.errorCollector = (error) => res.errors.push(error);

	next();
};

module.exports = { errorCollector };
