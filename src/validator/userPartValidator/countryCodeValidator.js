const Validator = require("fastest-validator");

const {
	schemaUserTemplate: { countryCode },
} = require("~/template/userTemplate/schemaUserTemplate");

const v = new Validator();

const countryCodeValidation = {
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
};

const countryCodeValidator = v.compile(countryCodeValidation);

module.exports = { countryCodeValidator, countryCodeValidation };
