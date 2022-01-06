const { cellphoneValidator } = require("~/validator/userValidator/indexUserPartValidator");

const cellphoneValidatorMDW = async (req, res, next) => {
	try {
		const { cellphone } = req.body;

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
