const { validatorCompiler } = require("~/functions/utilities/validatorCompiler");

const {
	chatIDValidationSchema,
} = require("~/schemas/validationSchemas/chatValidationSchemas/chatIDValidationSchema");

const chatIDValidation = {
	properties: { ...chatIDValidationSchema.properties },

	info: {
		version: "1.0.0",
	},
};

const chatIDValidator = validatorCompiler(chatIDValidation.properties);

module.exports = { chatIDValidator, chatIDValidation };
