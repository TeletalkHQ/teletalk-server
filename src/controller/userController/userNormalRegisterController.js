const UserRegisterSchema = require("~/model/schema/userSchema/UserSchema");

const {
	util: { idMaker },
} = require("~/function/util");

exports.normalRegister = async (req, res) => {
	const private_id = idMaker();

	const {
		username,
		first_name,
		last_name,
		cellphone,
		country_code,
		country_name,
		mac_address,
	} = req.body;

	const body = {
		private_id,
		username,
		first_name,
		last_name,
		cellphone,
		country_code,
		country_name,
		mac_address,
	};

	try {
		req.body.private_id = private_id;
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
