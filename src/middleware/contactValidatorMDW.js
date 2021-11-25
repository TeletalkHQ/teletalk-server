const { contactValidator } = require("~/validator/userValidator/contactValidator");

const contactValidatorMDW = async (req, res, next) => {
	try {
		const { countryCode, countryName, phoneNumber, firstName, lastName } = req.body;

		const validationResult = await contactValidator({
			countryCode,
			countryName,
			phoneNumber,
			firstName,
			lastName,
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
