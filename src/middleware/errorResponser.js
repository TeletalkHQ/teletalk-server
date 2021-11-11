const { errorManager } = require("~/middleware/errorManager");

const errorResponser = (req, res, next) => {
	const { categorizedLength, uncategorizedLength } = res.errors;

	if (categorizedLength || uncategorizedLength) {
		errorManager(req, res, next);
	}
};

module.exports = { errorResponser };
