const { userAuthError } = require("~/constant/error/authError/userAuthError");

exports.authErrorController = (req, res) => {
	try {
		res.status(200).json(userAuthError);
	} catch (error) {
		res.status(500).json({ error: { message: "Unexpected server error" } });
	}
};
