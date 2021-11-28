const Validator = require("fastest-validator");

const {
	lastNameValidationSchema,
} = require("~/schema/validationSchema/userValidationSchema/lastNameValidationSchema");

const v = new Validator();

const lastNameValidation = {
	...lastNameValidationSchema,
};

const lastNameValidator = v.compile(lastNameValidation);

module.exports = { lastNameValidator, lastNameValidation };
