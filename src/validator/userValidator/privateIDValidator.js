const Validator = require("fastest-validator");

const {
	privateIDValidationSchema,
} = require("~/schema/validationSchema/userValidationSchema/privateIDValidationSchema");

const v = new Validator();

const privateIDValidation = {
	properties: { ...privateIDValidationSchema.properties },

	info: {
		version: "1.0.0",
	},
};

const privateIDValidator = v.compile(privateIDValidation.properties);

module.exports = { privateIDValidator, privateIDValidation };
