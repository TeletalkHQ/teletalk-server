const { validatorCompiler } = require("~/function/utility/validatorCompiler");

const {
	privateIDValidationSchema,
} = require("~/schema/validationSchema/userValidationSchema/privateIDValidationSchema");

const privateIDValidation = {
	properties: { ...privateIDValidationSchema.properties },

	info: {
		version: "1.0.0",
	},
};

const privateIDValidator = validatorCompiler(privateIDValidation.properties);

module.exports = { privateIDValidator, privateIDValidation };
