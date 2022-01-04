const Validator = require("fastest-validator");

const {
	lastNameValidationSchema,
} = require("~/schema/validationSchema/userValidationSchema/lastNameValidationSchema");

const v = new Validator();

const lastNameValidation = {
	properties: { ...lastNameValidationSchema.properties },

	info: {
		version: "1.0.0",
	},
};

const lastNameValidator = v.compile(lastNameValidation.properties);

module.exports = { lastNameValidator, lastNameValidation };
