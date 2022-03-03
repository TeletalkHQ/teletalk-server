const { cellphoneValidator } = require("~/validators/userValidators/indexUserPartValidator");

const cellphoneValidatorMDW = async (req, res, next) => {
	try {
		const { phoneNumber, countryCode, countryName } = req.body;

		console.log(req.body);
		const cellphone = { phoneNumber, countryCode, countryName };

		const cellphoneValidate = await cellphoneValidator({
			...cellphone,
		});

		if (cellphoneValidate !== true) {
			throw cellphoneValidate;
		}

		next();
	} catch (error) {
		console.log("cellphoneValidatorMDW catch", error);
		res.errorCollector({ data: { error } });
		res.errorResponser();
	}
};

module.exports = { cellphoneValidatorMDW };
