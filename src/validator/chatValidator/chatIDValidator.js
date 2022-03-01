const { validatorCompiler } = require("~/function/utility/validatorCompiler");

const {
	chatIDValidationSchema,
} = require("~/schema/validationSchema/chatValidationSchema/chatIDValidationSchema");

const chatIDValidation = {
	properties: { ...chatIDValidationSchema.properties },

	info: {
		version: "1.0.0",
	},
};

const chatIDValidator = validatorCompiler(chatIDValidation.properties);

module.exports = { chatIDValidator, chatIDValidation };
