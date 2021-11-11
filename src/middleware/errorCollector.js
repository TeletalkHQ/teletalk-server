const errorCollector = (req, res, next) => {
	res.errors = {
		statusCode: 400,
		categorizedLength: 0,
		uncategorizedLength: 0,
		categorized: [],
		uncategorized: [],
	};

	res.errorCollector = (error, statusCode) => {
		if (error) {
			if (typeof error === "object") {
				res.errors.categorizedLength = res.errors.categorized.push(error);
			} else {
				//* Handle non-object error, write log into log files=>
				res.errors.uncategorizedLength = res.errors.uncategorized.push(error);
			}
		} else {
			//* Handle errorless call here, write log into log files =>
		}
		if (statusCode && !isNaN(+statusCode)) {
			res.errors.statusCode = statusCode;
		}
	};

	next();
};

module.exports = { errorCollector };
