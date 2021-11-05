const jwt = require("jsonwebtoken");

const tokenMaker = async (data, secret, options = {}) => {
	const token = jwt.sign(data, secret || process.env.JWT_SECRET, {
		algorithm: options.algorithm || "HS256",
	});

	return token;
};

module.exports = { tokenMaker };
