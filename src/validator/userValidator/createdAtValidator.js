const Validator = require("fastest-validator");

const {
	createdAtValidationSchema,
} = require("~/schema/validationSchema/commonValidationSchema/createdAtValidationSchema");

const v = new Validator();

const createdAtValidation = {
	...createdAtValidationSchema,
};

const createdAtValidator = v.compile(createdAtValidation);

module.exports = { createdAtValidator, createdAtValidation };
