const { passwordGenerator } = require("~/function/utility/passwordGenerator");
const { tokenSigner } = require("~/function/utility/tokenSigner");

const signInNormalUserController = async (req, res) => {
	try {
		const { cellphone } = req.body;

		const { randomPassword } = passwordGenerator();

		const { token } = await tokenSigner({
			//! Pass is temporary!
			data: { cellphone, pass: randomPassword },
			secret: process.env.JWT_SIGN_IN_SECRET,
		});

		res.status(200).json({
			cellphone,
			token,
		});
	} catch (error) {
		res.errorCollector({ data: { error } });
		res.errorResponser();
	}
};

module.exports = { signInNormalUserController };
