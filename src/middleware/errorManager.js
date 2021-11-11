const errorManager = (req, res, next) => {
	const { statusCode, categorized, uncategorized } = res.errors;

	res
		.status(statusCode)
		.json({ errors: { categorized, uncategorized, statusCode } });
};

module.exports = { errorManager };
