const { cellphoneValidator } = require("~/validator/userPartValidator/indexUserPartValidator");

const cellphoneValidatorMDW = async (req, res, next) => {
	try {
		const { cellphone } = req.body;

		const cellphoneValidate = await cellphoneValidator({
			...cellphone,
		});

		if (cellphoneValidate !== true) {
			throw cellphoneValidate;
		}
	} catch (error) {
		console.log("cellphoneValidatorMDW catch", error);
		res.errorCollector({ error });
	} finally {
		next();
	}
};

module.exports = { cellphoneValidatorMDW };
