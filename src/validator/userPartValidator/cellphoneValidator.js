const Validator = require("fastest-validator");

const {
	cellphoneValidationSchema,
} = require("~/schema/validationSchema/cellphoneValidationSchema");

const {
	countryCodeValidationSchema,
} = require("~/schema/validationSchema/countryCodeValidationSchema");
const {
	countryNameValidationSchema,
} = require("~/schema/validationSchema/countryNameValidationSchema");

const v = new Validator();

const cellphoneValidation = {
	...cellphoneValidationSchema,
	...countryCodeValidationSchema,
	...countryNameValidationSchema,
};

const cellphoneValidator = v.compile(cellphoneValidation);

module.exports = { cellphoneValidator, cellphoneValidation };
