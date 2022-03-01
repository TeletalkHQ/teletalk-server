const { validatorCompiler } = require("~/function/utility/validatorCompiler");

const {
	createdAtValidationSchema,
} = require("~/schema/validationSchema/commonValidationSchema/createdAtValidationSchema");

const createdAtValidation = {
	properties: { ...createdAtValidationSchema.properties },

	info: {
		version: "1.0.0",
	},
};

const createdAtValidator = validatorCompiler(createdAtValidation.properties);

module.exports = { createdAtValidator, createdAtValidation };
