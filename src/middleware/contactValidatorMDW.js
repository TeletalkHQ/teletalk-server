const { contactValidator } = require("~/validator/userValidator/contactValidator");

const contactValidatorMDW = async (req, res, next) => {
	try {
		const { phoneNumber, countryCode, countryName, firstName, lastName } = req.body;

		const cellphone = { phoneNumber, countryCode, countryName };

		const validationResult = await contactValidator({
			...cellphone,
			firstName,
			lastName,
		});

		if (validationResult !== true) {
			throw validationResult;
		}

		next();
	} catch (error) {
		res.errorCollector({ data: { error } });
		res.errorResponser();
	}
};

module.exports = { contactValidatorMDW };
