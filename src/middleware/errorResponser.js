const errorResponser = (req, res, next) => {
	try {
		const {
			categorized,
			categorizedLength,
			server,
			serverLength,
			statusCode: statusCodeFromCollector,
			uncategorized,
			uncategorizedLength,
		} = res.errors;

		console.log(categorizedLength || serverLength || uncategorizedLength);

		if (categorizedLength || serverLength || uncategorizedLength) {
			const resCode = statusCodeFromCollector || 400;

			// logger.redBright(resCode).log(17);

			res
				.status(resCode)
				.json({ errors: { categorized, uncategorized, statusCode: resCode, server } });
		} else {
			next();
		}
	} catch (error) {
		// logger.redBright("BAD ERROR!!!").log();
		logger.log("errorResponser catch ", error);
	}
};

module.exports = { errorResponser };
