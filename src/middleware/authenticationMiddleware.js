const jwt = require("jsonwebtoken");

const authenticationMiddleware = (req, res, next) => {
	try {
		const { token } = req.body;

		const verified = jwt.verify(token, process.env.JWT_SECRET, {
			complete: true,
		});

		if (verified) {
			req.user = jwt.decode(token, { complete: true });
		} else {
			throw new Error("token not valid");
		}
	} catch (error) {
		res.errorCollector({ authentication: error });
	}

	next();
};

module.exports = { authenticationMiddleware };
