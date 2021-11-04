const { UserModel } = require("~/model/userModel/UserModel");

const {
	registerUserValidator,
} = require("~/validator/userValidator/registerUserValidator");

const {
	randomID: { randomID },
} = require("~/function/utility/randomID");

const normalRegisterUserController = async (req, res) => {
	try {
		const privateID = randomID();

		const {
			body: {
				username,
				firstName,
				lastName,
				cellphone,
				countryCode,
				countryName,
				macAddress,
			},
		} = req;

		const body = {
			privateID,
			username,
			firstName,
			lastName,
			cellphone,
			countryCode,
			countryName,
			macAddress,
		};

		const validationResult = await registerUserValidator(body);

		if (validationResult === true) {
			const user = new UserModel(body);

			await user.save();

			res.status(200).json(body);
		} else {
			throw validationResult;
		}
	} catch (err) {
		res.status(400).json(err);
	}
};

module.exports = { normalRegisterUserController };
