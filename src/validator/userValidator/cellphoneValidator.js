const Validator = require("fastest-validator");

const {
	phoneNumberValidationSchema,
} = require("~/schema/validationSchema/userValidationSchema/phoneNumberValidationSchema");

const {
	countryCodeValidationSchema,
} = require("~/schema/validationSchema/userValidationSchema/countryCodeValidationSchema");
const {
	countryNameValidationSchema,
} = require("~/schema/validationSchema/userValidationSchema/countryNameValidationSchema");

const v = new Validator();

const cellphoneValidation = {
	...phoneNumberValidationSchema,
	...countryCodeValidationSchema,
	...countryNameValidationSchema,
};

const cellphoneValidator = v.compile(cellphoneValidation);

module.exports = { cellphoneValidator, cellphoneValidation };
