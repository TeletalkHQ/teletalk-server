const {
	cellphoneValidator,
} = require("~/validator/userPartValidator/indexUserPartValidator");

const cellphoneValidatorMiddleware = async (req, res, next) => {
	try {
		const { cellphone } = req.body;
		const cellphoneValidate = await cellphoneValidator({ cellphone });
		if (cellphoneValidate !== true) {
			throw cellphoneValidate;
		}
	} catch (error) {
		res.errorCollector({ cellphone: error });
	}

	next();
};

module.exports = { cellphoneValidatorMiddleware };
