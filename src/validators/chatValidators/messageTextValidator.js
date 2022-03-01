const { validatorCompiler } = require("~/functions/utilities/validatorCompiler");

const {
	messageTextValidationSchema,
} = require("~/schemas/validationSchemas/chatValidationSchemas/messageTextValidationSchema");

const messageTextValidation = {
	properties: { ...messageTextValidationSchema.properties },

	info: {
		version: "1.0.0",
	},
};

const messageTextValidator = validatorCompiler(messageTextValidation.properties);

module.exports = { messageTextValidator, messageTextValidation };
