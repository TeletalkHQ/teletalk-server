const {
	chatSchemaTemplate: { chatID },
} = require("~/template/schemaTemplate/chatSchemaTemplate");

const chatIDValidationSchema = {
	chatID: {
		type: chatID.type.value,
		unique: chatID.unique.value,
		min: chatID.minlength.value,
		max: chatID.maxlength.value,
		trim: chatID.trim.value,
		messages: {
			string: chatID.type.error.message,
			required: chatID.required.error.message,
			unique: chatID.unique.error.message,
			stringMin: chatID.minlength.error.message,
			stringMax: chatID.maxlength.error.message,
		},
	},

	info: {
		version: "1.0.0",
	},
};

module.exports = { chatIDValidationSchema };
