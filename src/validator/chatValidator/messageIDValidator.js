const Validator = require("fastest-validator");

const {
	messageIDValidationSchema,
} = require("~/schema/validationSchema/chatValidationSchema/messageIDValidationSchema");

const v = new Validator();

const messageIDValidation = {
	properties: { ...messageIDValidationSchema.properties },

	info: {
		version: "1.0.0",
	},
};

const messageIDValidator = v.compile(messageIDValidation.properties);

module.exports = { messageIDValidator, messageIDValidation };
