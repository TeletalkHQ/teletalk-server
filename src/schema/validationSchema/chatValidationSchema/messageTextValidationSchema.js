const {
	chatSchemaTemplate: {
		message: { properties: message },
	},
} = require("~/template/schemaTemplate/chatSchemaTemplate");

const messageTextValidationSchema = {
	properties: {
		message: {
			type: message.type.value,
			min: message.minlength.value,
			max: message.maxlength.value,
			messages: {
				string: message.type.error.message,
				stringMin: message.minlength.error.message,
				stringMax: message.maxlength.error.message,
			},
		},
	},

	info: {
		version: "1.0.0",
	},
};

module.exports = { messageTextValidationSchema };
