const errorCollector = (req, res, next) => {
	res.errors = {
		categorized: [],
		categorizedLength: 0,
		server: [],
		serverLength: 0,
		statusCode: 400,
		uncategorized: [],
		uncategorizedLength: 0,
	};

	res.errorCollector = (data) => {
		try {
			if (!data) {
				const error =
					"Report to your back-end: Yo! you forgot to send me data - errorCollector";
				throw error;
			}

			const { statusCode, err, ex, error } = data;

			const er = err || ex || error;

			if (!er) {
				const error =
					"Report to your back-end: Yo! you forgot to send me error - errorCollector";
				throw error;
			}

			if (typeof er === "object") {
				res.errors.categorizedLength = res.errors.categorized.push(er);
			} else {
				//? unhandled (non-object) error, write log into log files=>
				res.errors.uncategorizedLength = res.errors.uncategorized.push(er);
			}

			if (statusCode && !isNaN(+statusCode)) {
				res.errors.statusCode = statusCode;
			}
		} catch (error) {
			logger.redBright("errorCollector catch! its critical!!!").log(error);
			res.errors.serverLength = res.errors.server.push(error);
			res.errorResponser({ statusCode: 500 });
		}
	};

	next();
};

module.exports = { errorCollector };

logger.bgBlack([1, 2, 3, 4, 5, 6, 7, 8, 9], logger.colors.red).log("");
