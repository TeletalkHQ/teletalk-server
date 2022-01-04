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
	properties: {
		...phoneNumberValidationSchema.properties,
		...countryCodeValidationSchema.properties,
		...countryNameValidationSchema.properties,
	},

	info: {
		version: "1.0.0",
	},
};

const cellphoneValidator = v.compile(cellphoneValidation.properties);

module.exports = { cellphoneValidator, cellphoneValidation };
