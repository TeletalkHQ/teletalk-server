const { UserModel } = require("~/model/userModel/UserModel");

const {
	passwordGenerator,
	passwords,
} = require("~/function/utility/passwordGenerator");

const loginNormalUserController = async (req, res) => {
	try {
		const {
			body: { cellphone, countryCode },
		} = req;

		const user = await UserModel.findOne({
			cellphone,
		});

		if (user) {
			const randomPassword = passwordGenerator({ numbers: true });
			passwords.pass = randomPassword;
			res.status(200).json({
				randomPassword,
				cellphone: `${countryCode}${cellphone}`,
			});
		} else {
			const xs = "user not exist";
			throw xs;
		}
	} catch (error) {
		res.status(400).json(error);
	}
};

module.exports = { loginNormalUserController };
