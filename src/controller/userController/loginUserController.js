const { User } = require("~/model/schema/userSchema/UserSchema");

const {
	loginUserValidator,
} = require("~/model/validator/userValidator/loginUserValidator");

const { passwordGenerator } = require("~/function/utility/passwordGenerator");

const loginUserController = async (req, res) => {
	try {
		const {
			body: { cellphone, countryCode, countryName },
		} = req;

		const validationResult = loginUserValidator({
			cellphone,
			countryCode,
			countryName,
		});

		if (validationResult === true) {
			const user = await User.findOne({
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
		} else throw validationResult;
	} catch (error) {
		console.log(error);
		res.status(400).json({ error });
	}
};

module.exports = { loginUserController };
