const { userError } = require("~/constant/error/userError/userError");

const errorUserController = (req, res) => {
	try {
		res.status(200).json(userError);
	} catch (error) {
		res.errorCollector({ error: { message: "Unexpected server error" } });
		res.errorResponser({ statusCode: 500 });
	}
};

module.exports = { errorUserController };
