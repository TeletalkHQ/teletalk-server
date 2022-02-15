const { userErrorTemplate } = require("~/template/errorTemplate/userErrorTemplate");

const errorUserController = (req, res) => {
	try {
		res.status(200).json(userErrorTemplate);
	} catch (error) {
		res.errorCollector({
			data: { error: { message: "Unexpected server error", statusCode: 500 } },
		});
		res.errorResponser();
	}
};

module.exports = { errorUserController };
