const UserRegisterSchema = require("~/model/schema/userSchema/UserSchema");

const {
	util: { idMaker },
} = require("~/function/util");

exports.register = async (req, res) => {
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

	req.body.private_id = private_id;

	try {
		const validateSuccess = await UserRegisterSchema.userRegisterValidator({
			username,
			first_name,
			last_name,
			cellphone,
			country_code,
			country_name,
			mac_address,
		});

		if (validateSuccess === true) {
			const User = new UserRegisterSchema({
				private_id,
				username,
				first_name,
				last_name,
				cellphone,
				country_code,
				country_name,
				mac_address,
			});

			await User.save();

			res.status(200).json({
				private_id,
				username,
				first_name,
				last_name,
				cellphone,
				country_code,
				country_name,
				mac_address,
			});
		} else throw validateSuccess;
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
