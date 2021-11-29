const Validator = require("fastest-validator");

const {
	messageIDValidationSchema,
} = require("~/schema/validationSchema/chatValidationSchema/messageIDValidationSchema");

const v = new Validator();

const messageIDValidation = {
	...messageIDValidationSchema,
};

const messageIDValidator = v.compile(messageIDValidation);

module.exports = { messageIDValidator, messageIDValidation };
