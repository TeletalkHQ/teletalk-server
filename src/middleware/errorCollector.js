const errorCollector = (req, res, next) => {
	res.errors = { categorized: [], uncategorized: [], statusCode: 400 };

	res.errorCollector = (error) => {
		if (error) {
			if (typeof error === "object") {
				res.errors.categorized.push(error);
			} else {
				res.errors.uncategorized.push(error);
			}
		}
	};

	next();
};

module.exports = { errorCollector };
