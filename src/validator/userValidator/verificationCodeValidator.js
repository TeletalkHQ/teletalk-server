const Validator = require("fastest-validator");

const {
	verificationCodeValidationSchema,
} = require("~/schema/validationSchema/userValidationSchema/verificationCodeValidationSchema");

const v = new Validator();

const verificationCodeValidation = {
	properties: { ...verificationCodeValidationSchema.properties },

	info: {
		version: "1.0.0",
	},
};

const verificationCodeValidator = v.compile(verificationCodeValidation.properties);

module.exports = { verificationCodeValidator, verificationCodeValidation };
