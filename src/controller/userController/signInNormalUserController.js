const { userFinder } = require("~/function/helper/userFinder");
// const { passwordGenerator } = require("~/function/utility/passwordGenerator");
const { tokenSigner } = require("~/function/utility/tokenSigner");

const signInNormalUserController = async (req, res) => {
	try {
		const { cellphone } = req.body;

		const { user } = await userFinder({ ...cellphone });

		if (user === null) {
			// const { randomPassword } = passwordGenerator();

			const { token } = await tokenSigner({
				data: { cellphone },
				secret: process.env.JWT_SIGN_IN_SECRET,
			});

			res.status(200).json({
				cellphone,
				token,
			});
		} else {
			throw user;
		}
	} catch (error) {
		res.errorCollector({ data: { error } });
		res.errorResponser();
	}
};

module.exports = { signInNormalUserController };
