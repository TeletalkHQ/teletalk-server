const Validator = require("fastest-validator");

const {
	countryCodeValidationSchema,
} = require("~/schema/validationSchema/userValidationSchema/countryCodeValidationSchema");

const v = new Validator();

const countryCodeValidation = {
	properties: { ...countryCodeValidationSchema.properties },

	info: {
		version: "1.0.0",
	},
};

const countryCodeValidator = v.compile(countryCodeValidation.properties);

module.exports = { countryCodeValidator, countryCodeValidation };
