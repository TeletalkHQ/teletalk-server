const Validator = require("fastest-validator");

const {
	userTemplate: {
		cellphone,
		country_code,
		country_name,
		// mac_address,
	},
} = require("~/model/template/userTemplate/userTemplate");

const v = new Validator();

const userLoginValidationSchema = {
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
	country_code: {
		type: country_code.type[0],
		min: country_code.minlength[0],
		max: country_code.maxlength[0],
		trim: country_code.trim[0],
		messages: {
			string: country_code.type[1],
			required: country_code.required[1],
			stringMin: country_code.minlength[1],
			stringMax: country_code.maxlength[1],
		},
	},
	country_name: {
		type: country_name.type[0],
		min: country_name.minlength[0],
		max: country_name.maxlength[0],
		messages: {
			string: country_name.type[1],
			required: country_name.required[1],
			stringMin: country_name.minlength[1],
			stringMax: country_name.maxlength[1],
		},
	},
};

const userLoginValidator = v.compile(userLoginValidationSchema);

exports.userLoginValidator = userLoginValidator;
