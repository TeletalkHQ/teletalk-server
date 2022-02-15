const Validator = require("fastest-validator");

const {
	createdAtValidationSchema,
} = require("~/schema/validationSchema/commonValidationSchema/createdAtValidationSchema");

const v = new Validator();

const createdAtValidation = {
	properties: { ...createdAtValidationSchema.properties },

	info: {
		version: "1.0.0",
	},
};

const createdAtValidator = v.compile(createdAtValidation.properties);

module.exports = { createdAtValidator, createdAtValidation };
