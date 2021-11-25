const Validator = require("fastest-validator");

const {
	usernameValidationSchema,
} = require("~/schema/validationSchema/usernameValidationSchema");

const v = new Validator();

const usernameValidation = {
	...usernameValidationSchema,
};

const usernameValidator = v.compile(usernameValidation);

module.exports = { usernameValidator, usernameValidation };
