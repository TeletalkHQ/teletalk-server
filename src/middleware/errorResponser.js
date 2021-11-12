const { myConsole } = require("~/function/utility/myConsole");

const errorResponser = (req, res, next) => {
	const {
		categorizedLength,
		uncategorizedLength,
		categorized,
		uncategorized,
		statusCode,
	} = res.errors;
	if (categorizedLength || uncategorizedLength) {
		myConsole.redBright(statusCode, "red").log();
		res
			.status(statusCode || 400)
			.json({ errors: { categorized, uncategorized, statusCode } });
	} else {
		console.log("errorResponser else");
		next();
	}
};

module.exports = { errorResponser };
