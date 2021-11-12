const jwt = require("jsonwebtoken");

const tokenMaker = async (data, secret, options = { algorithm: "HS256" }) => {
	const token = await jwt.sign(data, secret || process.env.JWT_SECRET, {
		algorithm: options.algorithm,
	});

	console.log("tokenMaker", token);

	return { token };
};

module.exports = { tokenMaker };
