const { validatorCompiler } = require("~/functions/utilities/validatorCompiler");

const {
	usernameValidationSchema,
} = require("~/schemas/validationSchemas/userValidationSchemas/usernameValidationSchema");

const usernameValidation = {
	properties: { ...usernameValidationSchema.properties },

	info: {
		version: "1.0.0",
	},
};

const usernameValidator = validatorCompiler(usernameValidation.properties);

module.exports = { usernameValidator, usernameValidation };
