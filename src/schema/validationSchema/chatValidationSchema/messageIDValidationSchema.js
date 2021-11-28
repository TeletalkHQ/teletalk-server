const {
	chatSchemaTemplate: { messageID },
} = require("~/template/schemaTemplate/chatSchemaTemplate");

const messageIDValidationSchema = {
	messageID: {
		type: messageID.type.value,
		unique: messageID.unique.value,
		min: messageID.minlength.value,
		max: messageID.maxlength.value,
		trim: messageID.trim.value,
		messages: {
			string: messageID.type.error.message,
			required: messageID.required.error.message,
			unique: messageID.unique.error.message,
			stringMin: messageID.minlength.error.message,
			stringMax: messageID.maxlength.error.message,
		},
	},
};

module.exports = { messageIDValidationSchema };
