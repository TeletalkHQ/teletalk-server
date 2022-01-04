const Validator = require("fastest-validator");

const {
	participantIDValidationSchema,
} = require("~/schema/validationSchema/chatValidationSchema/participantIDValidationSchema");

const v = new Validator();

const participantIDValidation = {
	properties: { ...participantIDValidationSchema.properties },

	info: {
		version: "1.0.0",
	},
};

const participantIDValidator = v.compile(participantIDValidation.properties);

module.exports = { participantIDValidator, participantIDValidation };
