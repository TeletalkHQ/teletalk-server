const { myConsole } = require("~/function/utility/myConsole");

const errorResponser = (req, res, next) => {
	const {
		categorizedLength,
		uncategorizedLength,
		categorized,
		uncategorized,
		statusCode,
	} = res.errors;
	myConsole.redBright(statusCode, "red").log();
	if (categorizedLength || uncategorizedLength) {
		res
			.status(statusCode || 400)
			.json({ errors: { categorized, uncategorized, statusCode } });
	} else {
		myConsole.redBright("errorResponse else called", "red").log();
		next();
	}
};

module.exports = { errorResponser };
