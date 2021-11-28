const Validator = require("fastest-validator");

const {
	privateIDValidationSchema,
} = require("~/schema/validationSchema/userValidationSchema/privateIDValidationSchema");

const v = new Validator();

const privateIDValidation = {
	...privateIDValidationSchema,
};

const privateIDValidator = v.compile(privateIDValidation);

module.exports = { privateIDValidator, privateIDValidation };
