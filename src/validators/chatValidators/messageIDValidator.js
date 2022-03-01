const { validatorCompiler } = require("~/functions/utilities/validatorCompiler");

const {
	messageIDValidationSchema,
} = require("~/schemas/validationSchemas/chatValidationSchemas/messageIDValidationSchema");

const messageIDValidation = {
	properties: { ...messageIDValidationSchema.properties },

	info: {
		version: "1.0.0",
	},
};

const messageIDValidator = validatorCompiler(messageIDValidation.properties);

module.exports = { messageIDValidator, messageIDValidation };
