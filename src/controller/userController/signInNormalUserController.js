const { userFinder } = require("~/function/helper/userFinder");
const {
	passwordGenerator,
	passwords,
} = require("~/function/utility/passwordGenerator");
const { tokenMaker } = require("~/function/utility/tokenMaker");

const signInNormalUserController = async (req, res, next) => {
	try {
		const { cellphone, countryCode, countryName } = req.body;

		const { user } = await userFinder({ cellphone });

		if (user === null) {
			console.log("user", user);
			// const { randomPassword } = passwordGenerator();

			passwords.pass = 123456;
			// passwords.pass = randomPassword;

			console.log("pass", passwords.pass);

			const { token } = await tokenMaker({
				cellphone,
				countryCode,
				countryName,
				pass: passwords.pass,
			});

			console.log("token", token);

			res.status(200).json({
				token,
				cellphone,
				countryCode,
				countryName,
				pass: passwords.pass,
			});
		} else {
			throw user;
		}
	} catch (error) {
		res.errorCollector(error);
		res.errorResponser();
	}
};

module.exports = { signInNormalUserController };
