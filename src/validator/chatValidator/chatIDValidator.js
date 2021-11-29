const Validator = require("fastest-validator");

const {
	chatIDValidationSchema,
} = require("~/schema/validationSchema/chatValidationSchema/chatIDValidationSchema");

const v = new Validator();

const chatIDValidation = {
	...chatIDValidationSchema,
};

const chatIDValidator = v.compile(chatIDValidation);

module.exports = { chatIDValidator, chatIDValidation };
