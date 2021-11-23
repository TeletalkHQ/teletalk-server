const { contactValidator } = require("~/validator/userValidator/contactValidator");

const contactValidatorMDW = async (req, res, next) => {
	try {
		const { cellphone, countryCode, countryName } = req.body;

		const validationResult = await contactValidator({
			cellphone,
			countryCode,
			countryName,
		});

		if (validationResult !== true) {
			throw validationResult;
		}
	} catch (error) {
		res.errorCollector({ error });
	} finally {
		next();
	}
};

module.exports = { contactValidatorMDW };
