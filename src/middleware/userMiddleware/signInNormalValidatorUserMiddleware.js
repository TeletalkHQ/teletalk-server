const {
	signInNormalUserValidator,
} = require("~/validator/userValidator/signInNormalUserValidator");

const signInNormalValidatorUserMiddleware = async (req, res, next) => {
	try {
		const { cellphone, countryCode, countryName } = req.body;

		const validationResult = await signInNormalUserValidator({
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
		console.log("middleware signIn");
		next();
	}
};

module.exports = { signInNormalValidatorUserMiddleware };
