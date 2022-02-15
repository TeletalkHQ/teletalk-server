const Validator = require("fastest-validator");

const {
	chatIDValidationSchema,
} = require("~/schema/validationSchema/chatValidationSchema/chatIDValidationSchema");

const v = new Validator();

const chatIDValidation = {
	properties: { ...chatIDValidationSchema.properties },

	info: {
		version: "1.0.0",
	},
};

const chatIDValidator = v.compile(chatIDValidation.properties);

module.exports = { chatIDValidator, chatIDValidation };
