const { validatorCompiler } = require("~/function/utility/validatorCompiler");

const {
	bioValidationsSchema,
} = require("~/schema/validationSchema/userValidationSchema/bioValidationsSchema");

const bioValidation = {
	properties: { ...bioValidationsSchema.properties },

	info: {
		version: "1.0.0",
	},
};

const bioValidator = validatorCompiler(bioValidation.properties);

module.exports = { bioValidator, bioValidation };
