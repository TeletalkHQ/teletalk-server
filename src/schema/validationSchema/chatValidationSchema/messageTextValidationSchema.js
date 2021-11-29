const {
	chatSchemaTemplate: { messageText },
} = require("~/template/schemaTemplate/chatSchemaTemplate");

const messageTextValidationSchema = {
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
};

module.exports = { messageTextValidationSchema };
