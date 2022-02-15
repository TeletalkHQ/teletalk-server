const Validator = require("fastest-validator");

const {
	firstNameValidationSchema,
} = require("~/schema/validationSchema/userValidationSchema/firstNameValidationSchema");

const v = new Validator();

const firstNameValidation = {
	properties: { ...firstNameValidationSchema.properties },

	info: {
		version: "1.0.0",
	},
};

const firstNameValidator = v.compile(firstNameValidation.properties);

module.exports = { firstNameValidator, firstNameValidation };
