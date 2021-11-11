const {
	normalRegisterUserValidator,
} = require("~/validator/userValidator/normalRegisterUserValidator");

const { randomID } = require("~/function/utility/randomID");

const normalRegisterUserValidatorMiddleware = async (req, res, next) => {
	try {
		const userData = req.body;

		const privateID = randomID();

		const validationResult = await normalRegisterUserValidator({
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

module.exports = { normalRegisterUserValidatorMiddleware };
