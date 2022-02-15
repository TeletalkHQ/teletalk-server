const Validator = require("fastest-validator");

const {
	messageTextValidationSchema,
} = require("~/schema/validationSchema/chatValidationSchema/messageTextValidationSchema");

const v = new Validator();

const messageTextValidation = {
	properties: { ...messageTextValidationSchema.properties },

	info: {
		version: "1.0.0",
	},
};

const messageTextValidator = v.compile(messageTextValidation.properties);

module.exports = { messageTextValidator, messageTextValidation };
