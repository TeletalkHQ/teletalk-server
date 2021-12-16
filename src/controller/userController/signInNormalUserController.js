const { userError } = require("~/constant/error/userError/userError");
const { userFinder } = require("~/function/helper/userFinder");
const { passwordGenerator } = require("~/function/utility/passwordGenerator");
const { tokenSigner } = require("~/function/utility/tokenSigner");

const signInNormalUserController = async (req, res) => {
	try {
		const { cellphone } = req.body;

		const { user } = await userFinder({ ...cellphone });

		//TODO Error first
		if (user === null) {
			const { randomPassword } = passwordGenerator();

			const { token } = await tokenSigner({
				data: { cellphone, pass: randomPassword },
				secret: process.env.JWT_SIGN_IN_SECRET,
				//! Temporary!
			});

			res.status(200).json({
				cellphone,
				token,
			});
		} else {
			const error = { error: userError.CELLPHONE_EXIST };
			throw error;
		}
	} catch (error) {
		res.errorCollector({ data: { error } });
		res.errorResponser();
	}
};

module.exports = { signInNormalUserController };
