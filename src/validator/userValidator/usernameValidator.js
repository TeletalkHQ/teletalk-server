const Validator = require("fastest-validator");

const {
	usernameValidationSchema,
} = require("~/schema/validationSchema/userValidationSchema/usernameValidationSchema");

const v = new Validator();

const usernameValidation = {
	properties: { ...usernameValidationSchema.properties },

	info: {
		version: "1.0.0",
	},
};

const usernameValidator = v.compile(usernameValidation.properties);

module.exports = { usernameValidator, usernameValidation };
