const Validator = require("fastest-validator");

const {
	bioValidationsSchema,
} = require("~/schema/validationSchema/userValidationSchema/bioValidationsSchema");

const v = new Validator();

const bioValidation = {
	properties: { ...bioValidationsSchema.properties },

	info: {
		version: "1.0.0",
	},
};

const bioValidator = v.compile(bioValidation.properties);

module.exports = { bioValidator, bioValidation };
