const {
	phoneNumberValidationSchema,
} = require("~/schemas/validationSchemas/userValidationSchemas/phoneNumberValidationSchema");

const {
	countryCodeValidationSchema,
} = require("~/schemas/validationSchemas/userValidationSchemas/countryCodeValidationSchema");
const {
	countryNameValidationSchema,
} = require("~/schemas/validationSchemas/userValidationSchemas/countryNameValidationSchema");
const { validatorCompiler } = require("~/functions/utilities/validatorCompiler");

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
