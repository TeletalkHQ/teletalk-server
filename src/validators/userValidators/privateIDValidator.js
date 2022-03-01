const { validatorCompiler } = require("~/functions/utilities/validatorCompiler");

const {
	privateIDValidationSchema,
} = require("~/schemas/validationSchemas/userValidationSchemas/privateIDValidationSchema");

const privateIDValidation = {
	properties: { ...privateIDValidationSchema.properties },

	info: {
		version: "1.0.0",
	},
};

const privateIDValidator = validatorCompiler(privateIDValidation.properties);

module.exports = { privateIDValidator, privateIDValidation };
