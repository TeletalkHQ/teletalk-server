const { validatorCompiler } = require("~/function/utility/validatorCompiler");

const {
	countryNameValidationSchema,
} = require("~/schema/validationSchema/userValidationSchema/countryNameValidationSchema");

const countryNameValidation = {
	properties: { ...countryNameValidationSchema.properties },

	info: {
		version: "1.0.0",
	},
};

const countryNameValidator = validatorCompiler(countryNameValidation.properties);

module.exports = { countryNameValidator, countryNameValidation };
