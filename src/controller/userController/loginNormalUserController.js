const { UserModel } = require("~/model/userModel/UserModel");

const { passwordGenerator } = require("~/function/utility/passwordGenerator");

const loginNormalUserController = async (req, res) => {
	try {
		const {
			body: { cellphone, countryCode, countryName },
		} = req;

		const user = await UserModel.findOne({
			cellphone,
			countryCode,
			countryName,
		});
		if (user) {
			const randomPassword = passwordGenerator({ numbers: true });

			res.status(200).json({
				randomPassword,
				cellphone: `${countryCode}${cellphone}`,
			});
		} else {
			const xs = "user not exist";
			throw xs;
		}
	} catch (error) {
		res.status(400).json({ error });
	}
};

module.exports = { loginNormalUserController };
