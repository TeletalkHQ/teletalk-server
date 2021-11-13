const jwt = require("jsonwebtoken");
const { passwords } = require("~/function/utility/passwordGenerator");

const verifySignInNormalUserController = (req, res, next) => {
	try {
		console.log("req.headers", req.headers);

		const token = req.headers["authorization"];

		const verifiedToken = jwt.verify(token, process.env.JWT_SECRET, {
			complete: true,
		});

		console.log("verifiedToken", verifiedToken);
		const pass = passwords.pass;
		const decodedToken = jwt.decode(token, { complete: true });

		console.log("decodedToken", decodedToken);
		console.dir(req, { colors: true, depth: true });
		res.status(200).json({
			decodedToken,
			token,
			verifiedToken,
			reqHeaders: req.headers,
			pass,
		});
	} catch (err) {
		res.errorCollector(err);
		res.status(401).json({ err });
	}
};

module.exports = {
	verifySignInNormalUserController,
};
