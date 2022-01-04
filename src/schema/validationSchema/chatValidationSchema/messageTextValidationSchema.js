const {
	chatSchemaTemplate: {
		messageText: { properties: messageText },
	},
} = require("~/template/schemaTemplate/chatSchemaTemplate");

const messageTextValidationSchema = {
	properties: {
		messageText: {
			type: messageText.type.value,
			min: messageText.minlength.value,
			max: messageText.maxlength.value,
			messages: {
				string: messageText.type.error.message,
				stringMin: messageText.minlength.error.message,
				stringMax: messageText.maxlength.error.message,
			},
		},
	},

	info: {
		version: "1.0.0",
	},
};

module.exports = { messageTextValidationSchema };
