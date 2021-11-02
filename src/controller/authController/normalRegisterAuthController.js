const UserRegisterSchema = require("~/model/schema/authSchema/UserAuthSchema");

const {
	utilities: { idMaker },
} = require("~/function/utilities");

exports.normalRegisterAuthController = async (req, res) => {
	const privateID = idMaker();

	const {
		username,
		firstName,
		lastName,
		cellphone,
		countryCode,
		countryName,
		macAddress,
	} = req.body;

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

	try {
		req.body.privateID = privateID;
		const validationResult = await UserRegisterSchema.userRegisterValidator(
			body
		);

		if (validationResult === true) {
			const User = new UserRegisterSchema(body);

			await User.save();

			res.status(200).json(body);
		} else throw validationResult;
	} catch (err) {
		res.status(400).json({ mongooseError: err?.errors, validatorError: err });
	}
};

// const errorReporter = (requestBody, { mongooseError, validatorError }) => {
// 	const errors = [];

// 	Object.keys(mongooseError).length &&
// 		Object.entries(mongooseError).forEach(([key, value]) => {
// 			errors.push({
// 				field: key,
// 				message: value?.message,
// 				type: value?.properties?.type || value?.kind,
// 				value: value.value,
// 			});
// 		});

// 	validatorError.length && validatorError.forEach((err) => {});

// 	return errors;
// };

// errorReporter();
