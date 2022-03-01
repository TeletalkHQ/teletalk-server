const { validatorCompiler } = require("~/function/utility/validatorCompiler");

const {
	messageIDValidationSchema,
} = require("~/schema/validationSchema/chatValidationSchema/messageIDValidationSchema");

const messageIDValidation = {
	properties: { ...messageIDValidationSchema.properties },

	info: {
		version: "1.0.0",
	},
};

const messageIDValidator = validatorCompiler(messageIDValidation.properties);

module.exports = { messageIDValidator, messageIDValidation };
