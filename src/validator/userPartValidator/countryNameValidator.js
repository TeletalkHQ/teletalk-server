const Validator = require("fastest-validator");

const {
	countryNameValidationSchema,
} = require("~/schema/validationSchema/countryNameValidationSchema");

const v = new Validator();

const countryNameValidation = {
	...countryNameValidationSchema,
};

const countryNameValidator = v.compile(countryNameValidation);

module.exports = { countryNameValidator, countryNameValidation };
