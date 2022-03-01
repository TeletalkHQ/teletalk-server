const {
	phoneNumberValidationSchema,
} = require("~/schema/validationSchema/userValidationSchema/phoneNumberValidationSchema");

const {
	countryCodeValidationSchema,
} = require("~/schema/validationSchema/userValidationSchema/countryCodeValidationSchema");
const {
	countryNameValidationSchema,
} = require("~/schema/validationSchema/userValidationSchema/countryNameValidationSchema");
const { validatorCompiler } = require("~/function/utility/validatorCompiler");

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

const cellphoneValidator = validatorCompiler(cellphoneValidation.properties);

module.exports = { cellphoneValidator, cellphoneValidation };
