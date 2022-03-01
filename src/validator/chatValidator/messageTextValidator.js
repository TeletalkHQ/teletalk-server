const { validatorCompiler } = require("~/function/utility/validatorCompiler");

const {
	messageTextValidationSchema,
} = require("~/schema/validationSchema/chatValidationSchema/messageTextValidationSchema");

const messageTextValidation = {
	properties: { ...messageTextValidationSchema.properties },

	info: {
		version: "1.0.0",
	},
};

const messageTextValidator = validatorCompiler(messageTextValidation.properties);

module.exports = { messageTextValidator, messageTextValidation };
