const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const {
	chatSchemaTemplate: {
		chatID: { properties: chatID },
		createdAt: { properties: createdAt },
		messageID: { properties: messageID },
		// messageSender:{properties:messageSender},
		// messageStatus:{properties:messageStatus},
		messageText: { properties: messageText },
		participantID: { properties: participantID },
		// participantStatus:{properties:participantStatus},
		// participantVisibility:{properties:participantVisibility},
	},
} = require("~/template/schemaTemplate/chatSchemaTemplate");

// uniqueValidator.defaults.message = "{PATH}_exist";
// uniqueValidator.defaults.type = "mongoose-unique-validator";

const participantIDTemplate = {
	maxlength: [participantID.maxlength.value, participantID.maxlength.error.message],
	minlength: [participantID.minlength.value, participantID.minlength.error.message],
	required: [participantID.required.value, participantID.required.error.message],
	trim: participantID.trim.value,
	type: participantID.type.value,
	// unique: participantID.unique.value,
};

const privateChat = {
	chatID: {
		maxlength: [chatID.maxlength.value, chatID.maxlength.error.message],
		minlength: [chatID.minlength.value, chatID.minlength.error.message],
		required: [chatID.required.value, chatID.required.error.message],
		type: chatID.type.value,
		unique: chatID.unique.value,
	},
	createdAt: {
		default: createdAt.default.value,
		required: [createdAt.required.value, createdAt.required.error.message],
		type: createdAt.type.value,
	},
	messages: [
		{
			messageID: {
				default: messageID.default.value(messageID.maxlength.value),
				maxlength: [messageID.maxlength.value, messageID.maxlength.error.message],
				minlength: [messageID.minlength.value, messageID.minlength.error.message],
				required: [messageID.required.value, messageID.required.error.message],
				trim: messageID.trim.value,
				type: messageID.type.value,
				unique: messageID.unique.value,
			},
			messageText: {
				maxlength: [messageText.maxlength.value, messageText.maxlength.error.message],
				minlength: [messageText.minlength.value, messageText.minlength.error.message],
				type: messageText.type.value,
			},
			messageSender: {
				senderID: participantIDTemplate,
			},
		},
	],
	participants: [
		{
			participantID: participantIDTemplate,
		},
	],
};

const PrivateChatSchema = new mongoose.Schema({
	chatID: privateChat.chatID,
	createdAt: privateChat.createdAt,
	messages: privateChat.messages,
	participants: privateChat.participants,
});

PrivateChatSchema.plugin(uniqueValidator);

module.exports = { PrivateChatSchema };
