const {
	loginNormalUserValidator,
} = require("~/validator/userValidator/loginNormalUserValidator");

const loginNormalUserValidatorMiddleware = async (req, res, next) => {
	try {
		const { cellphone, countryCode, countryName } = req.body;

		const validationResult = await loginNormalUserValidator({
			cellphone,
			countryCode,
			countryName,
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

module.exports = { loginNormalUserValidatorMiddleware };
