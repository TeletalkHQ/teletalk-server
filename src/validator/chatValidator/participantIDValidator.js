const { validatorCompiler } = require("~/function/utility/validatorCompiler");

const {
	participantIDValidationSchema,
} = require("~/schema/validationSchema/chatValidationSchema/participantIDValidationSchema");

const participantIDValidation = {
	properties: { ...participantIDValidationSchema.properties },

	info: {
		version: "1.0.0",
	},
};

const participantIDValidator = validatorCompiler(participantIDValidation.properties);

module.exports = { participantIDValidator, participantIDValidation };
