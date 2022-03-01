const { validatorCompiler } = require("~/function/utility/validatorCompiler");

const {
	verificationCodeValidationSchema,
} = require("~/schema/validationSchema/userValidationSchema/verificationCodeValidationSchema");

const verificationCodeValidation = {
	properties: { ...verificationCodeValidationSchema.properties },

	info: {
		version: "1.0.0",
	},
};

const verificationCodeValidator = validatorCompiler(verificationCodeValidation.properties);

module.exports = { verificationCodeValidator, verificationCodeValidation };
