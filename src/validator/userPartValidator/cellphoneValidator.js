const Validator = require("fastest-validator");

const {
	phoneNumberValidationSchema,
} = require("~/schema/validationSchema/phoneNumberValidationSchema");

const {
	countryCodeValidationSchema,
} = require("~/schema/validationSchema/countryCodeValidationSchema");
const {
	countryNameValidationSchema,
} = require("~/schema/validationSchema/countryNameValidationSchema");

const v = new Validator();

const cellphoneValidation = {
	...phoneNumberValidationSchema,
	...countryCodeValidationSchema,
	...countryNameValidationSchema,
};

const cellphoneValidator = v.compile(cellphoneValidation);

module.exports = { cellphoneValidator, cellphoneValidation };
