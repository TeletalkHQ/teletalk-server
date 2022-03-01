const { validatorCompiler } = require("~/function/utility/validatorCompiler");

const {
	lastNameValidationSchema,
} = require("~/schema/validationSchema/userValidationSchema/lastNameValidationSchema");

const lastNameValidation = {
	properties: { ...lastNameValidationSchema.properties },

	info: {
		version: "1.0.0",
	},
};

const lastNameValidator = validatorCompiler(lastNameValidation.properties);

module.exports = { lastNameValidator, lastNameValidation };
