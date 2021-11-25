const Validator = require("fastest-validator");

const {
	verificationCodeValidationSchema,
} = require("~/schema/validationSchema/verificationCodeValidationSchema");

const v = new Validator();

const verificationCodeValidation = {
	...verificationCodeValidationSchema,
};

const verificationCodeValidator = v.compile(verificationCodeValidation);

module.exports = { verificationCodeValidator, verificationCodeValidation };
