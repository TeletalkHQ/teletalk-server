const JWT = require("jsonwebtoken");

const { initialValue } = require("~/constant/initialValue/initialValue");

const initialOptions = initialValue.jwtOptions;

const tokenSigner = async ({ data, secret, options = initialOptions }) => {
	try {
		// console.log(options);
		const token = JWT.sign(data, secret || process.env.JWT_MAIN_SECRET, {
			...initialOptions,
			...options,
		});

		// console.log(token);

		return { token };
	} catch (err) {
		throw err;
	}
};

module.exports = { tokenSigner };
