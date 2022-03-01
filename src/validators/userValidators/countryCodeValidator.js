const { validatorCompiler } = require("~/functions/utilities/validatorCompiler");

const {
	countryCodeValidationSchema,
} = require("~/schemas/validationSchemas/userValidationSchemas/countryCodeValidationSchema");

const countryCodeValidation = {
	properties: { ...countryCodeValidationSchema.properties },

	info: {
		version: "1.0.0",
	},
};

const countryCodeValidator = validatorCompiler(countryCodeValidation.properties);

module.exports = { countryCodeValidator, countryCodeValidation };
