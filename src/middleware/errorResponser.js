const { myConsole } = require("~/function/utility/myConsole");

const errorResponser = ({ req, res, next, statusCode }) => {
	try {
		const {
			categorizedLength,
			uncategorizedLength,
			categorized,
			uncategorized,
			statusCode: statusCodeFromCollector,
		} = res.errors;
		if (categorizedLength || uncategorizedLength) {
			myConsole.redBright(statusCode | statusCodeFromCollector).log();

			const resCode = statusCode || statusCodeFromCollector || 400;

			res
				.status(resCode)
				.json({ errors: { categorized, uncategorized, statusCode: resCode } });
		} else {
			next();
		}
	} catch (error) {
		console.log("errorResponser catch ", error);
		myConsole.redBright("BAD ERROR!!!").log();
	}
};

module.exports = { errorResponser };
