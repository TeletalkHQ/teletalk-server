const { validatorCompiler } = require("~/function/utility/validatorCompiler");

const {
	usernameValidationSchema,
} = require("~/schema/validationSchema/userValidationSchema/usernameValidationSchema");

const usernameValidation = {
	properties: { ...usernameValidationSchema.properties },

	info: {
		version: "1.0.0",
	},
};

const usernameValidator = validatorCompiler(usernameValidation.properties);

module.exports = { usernameValidator, usernameValidation };
