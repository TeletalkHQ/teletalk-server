const { validatorCompiler } = require("~/functions/utilities/validatorCompiler");

const {
	verificationCodeValidationSchema,
} = require("~/schemas/validationSchemas/userValidationSchemas/verificationCodeValidationSchema");

const verificationCodeValidation = {
	properties: { ...verificationCodeValidationSchema.properties },

	info: {
		version: "1.0.0",
	},
};

const verificationCodeValidator = validatorCompiler(verificationCodeValidation.properties);

module.exports = { verificationCodeValidator, verificationCodeValidation };
