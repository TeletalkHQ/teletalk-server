const { validatorCompiler } = require("~/function/utility/validatorCompiler");

const {
	countryCodeValidationSchema,
} = require("~/schema/validationSchema/userValidationSchema/countryCodeValidationSchema");

const countryCodeValidation = {
	properties: { ...countryCodeValidationSchema.properties },

	info: {
		version: "1.0.0",
	},
};

const countryCodeValidator = validatorCompiler(countryCodeValidation.properties);

module.exports = { countryCodeValidator, countryCodeValidation };
