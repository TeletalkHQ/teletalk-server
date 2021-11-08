const { authError } = require("~/constant/error/authError/authError");

const errorAuthController = (req, res) => {
	try {
		res.status(200).json(authError);
	} catch (error) {
		res.status(500).json({ error: { message: "Unexpected server error" } });
	}
};

module.exports = { errorAuthController };
