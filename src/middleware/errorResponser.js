const errorResponser = (req, res, next) => {
	const initialValue = { statusCode: "" };

	res.errorResponser = (data = initialValue) => {
		const { statusCode } = data;

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

			if (categorizedLength || serverLength || uncategorizedLength) {
				const resCode = statusCode || statusCodeFromCollector || 400;

				logger.redBright(resCode).log(17);

				res
					.status(resCode)
					.json({ errors: { categorized, uncategorized, statusCode: resCode, server } });
			} else {
				next();
			}
		} catch (error) {
			logger.redBright("BAD ERROR!!!").log();
			console.log("errorResponser catch ", error);
		}
	};

	next();
};

module.exports = { errorResponser };
