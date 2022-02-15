const Validator = require("fastest-validator");

const {
	countryNameValidationSchema,
} = require("~/schema/validationSchema/userValidationSchema/countryNameValidationSchema");

const v = new Validator();

const countryNameValidation = {
	properties: { ...countryNameValidationSchema.properties },

	info: {
		version: "1.0.0",
	},
};

const countryNameValidator = v.compile(countryNameValidation.properties);

module.exports = { countryNameValidator, countryNameValidation };
