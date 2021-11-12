const Validator = require("fastest-validator");

const {
	schemaUserTemplate: {
		cellphone,
		countryCode,
		countryName,
		// macAddress,
	},
} = require("~/template/userTemplate/schemaUserTemplate");

const v = new Validator();

const loginNormalUserValidation = {
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
};

const loginNormalUserValidator = v.compile(loginNormalUserValidation);

module.exports = { loginNormalUserValidator };
