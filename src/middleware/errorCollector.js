const errorCollector = (req, res, next) => {
	res.errors = {
		statusCode: 400,
		categorizedLength: 0,
		uncategorizedLength: 0,
		categorized: [],
		uncategorized: [],
	};

	res.errorCollector = ({ error, err, ex, statusCode }) => {
		const er = error || err || ex;
		if (er) {
			if (typeof er === "object") {
				res.errors.categorizedLength = res.errors.categorized.push(er);
			} else {
				//* Handle non-object error, write log into log files=>
				res.errors.uncategorizedLength = res.errors.uncategorized.push(er);
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
