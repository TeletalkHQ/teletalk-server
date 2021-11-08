const Validator = require("fastest-validator");

const {
	schemaUserTemplate: {
		bio,
		cellphone,
		countryCode,
		countryName,
		firstName,
		lastName,
		privateID,
		username,
		// macAddress,
	},
} = require("~/template/authTemplate/schemaAuthTemplate");

const v = new Validator();

const registerUserValidation = {
	privateID: {
		type: privateID.type[0],
		unique: privateID.unique[0],
		min: privateID.minlength[0],
		max: privateID.maxlength[0],
		trim: privateID.trim[0],
		messages: {
			string: privateID.type[1],
			required: privateID.required[1],
			unique: privateID.unique[1],
			stringMin: privateID.minlength[1],
			stringMax: privateID.maxlength[1],
		},
	},
	username: {
		type: username.type[0],
		optional: !username.required[0],
		unique: username.unique[0],
		max: username.maxlength[0],
		trim: username.trim[0],
		lowercase: username.lowercase[0],
		messages: {
			string: username.type[1],
			unique: username.unique[1],
			stringMax: username.maxlength[1],
		},
	},
	firstName: {
		type: firstName.type[0],
		min: firstName.minlength[0],
		max: firstName.maxlength[0],
		trim: firstName.trim[0],
		messages: {
			string: firstName.type[1],
			required: firstName.required[1],
			stringMin: firstName.minlength[1],
			stringMax: firstName.maxlength[1],
		},
	},
	lastName: {
		type: lastName.type[0],
		optional: !lastName.required[0],
		max: lastName.maxlength[0],
		trim: lastName.trim[0],
		messages: {
			string: lastName.type[1],
			stringMax: lastName.maxlength[1],
		},
	},

	cellphone: {
		type: cellphone.type[0],
		unique: cellphone.unique[0],
		min: cellphone.minlength[0],
		max: cellphone.maxlength[0],
		messages: {
			string: cellphone.type[1],
			unique: cellphone.unique[1],
			required: cellphone.required[1],
			stringMin: cellphone.minlength[1],
			stringMax: cellphone.type[1],
		},
	},
	countryCode: {
		type: countryCode.type[0],
		min: countryCode.minlength[0],
		max: countryCode.maxlength[0],
		trim: countryCode.trim[0],
		messages: {
			string: countryCode.type[1],
			required: countryCode.required[1],
			stringMin: countryCode.minlength[1],
			stringMax: countryCode.maxlength[1],
		},
	},
	countryName: {
		type: countryName.type[0],
		min: countryName.minlength[0],
		max: countryName.maxlength[0],
		messages: {
			string: countryName.type[1],
			required: countryName.required[1],
			stringMin: countryName.minlength[1],
			stringMax: countryName.maxlength[1],
		},
	},
	bio: {
		type: bio.type[0],
		optional: !bio.required[0],
		max: bio.maxlength[0],
		messages: {
			string: bio.type[1],
			stringMax: bio.maxlength[1],
		},
	},
	// macAddress: {
	// 	type: macAddress.type[0],
	// 	unique: macAddress.unique[0],
	// 	min: macAddress.minlength[0],
	// 	max: macAddress.maxlength[0],
	// 	trim: macAddress.trim[0],
	// 	messages: {
	// 		string: macAddress.type[1],
	// 		unique: macAddress.unique[1],
	// required: macAddress.required[1],
	// 		stringMin: macAddress.minlength[1],
	// 		stringMax: macAddress.maxlength[1],
	// 	},
	// },
	// createdAt: {
	// 	type: createdAt.type[0],
	// 	optimal: !createdAt.required[0],
	// },
};

const registerUserValidator = v.compile(registerUserValidation);

module.exports = { registerUserValidator };
