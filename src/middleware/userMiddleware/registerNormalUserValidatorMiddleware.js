const {
	registerNormalUserValidator,
} = require("~/validator/userValidator/registerNormalUserValidator");

const { randomID } = require("~/function/utility/randomID");

const registerNormalUserValidatorMiddleware = async (req, res, next) => {
	try {
		const userData = req.body;

		const privateID = randomID();

		const validationResult = await registerNormalUserValidator({
			...userData,
			privateID,
		});
		if (validationResult !== true) {
			throw validationResult;
		}
	} catch (error) {
		res.errorCollector(error);
	} finally {
		next();
	}
};

module.exports = { registerNormalUserValidatorMiddleware };
