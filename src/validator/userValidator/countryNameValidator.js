const Validator = require("fastest-validator");

const {
	countryNameValidationSchema,
} = require("~/schema/validationSchema/userValidationSchema/countryNameValidationSchema");

const v = new Validator();

const countryNameValidation = {
	...countryNameValidationSchema,
};

const countryNameValidator = v.compile(countryNameValidation);

module.exports = { countryNameValidator, countryNameValidation };
