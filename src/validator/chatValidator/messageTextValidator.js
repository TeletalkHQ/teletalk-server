const Validator = require("fastest-validator");

const {
	messageTextValidationSchema,
} = require("~/schema/validationSchema/chatValidationSchema/messageTextValidationSchema");

const v = new Validator();

const messageTextValidation = {
	...messageTextValidationSchema,
};

const messageTextValidator = v.compile(messageTextValidation);

module.exports = { messageTextValidator, messageTextValidation };
