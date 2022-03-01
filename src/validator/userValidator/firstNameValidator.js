const { validatorCompiler } = require("~/function/utility/validatorCompiler");

const {
	firstNameValidationSchema,
} = require("~/schema/validationSchema/userValidationSchema/firstNameValidationSchema");

const firstNameValidation = {
	properties: { ...firstNameValidationSchema.properties },

	info: {
		version: "1.0.0",
	},
};

const firstNameValidator = validatorCompiler(firstNameValidation.properties);

module.exports = { firstNameValidator, firstNameValidation };
